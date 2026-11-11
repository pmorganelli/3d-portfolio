import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Shape,
  ShapeGeometry,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const HALF_PI = Math.PI / 2;
const AXIS_VEC = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];

// Standard colour scheme: white up, green front, red right
const FACES = [
  { axis: 0, sign: 1, color: "#c41e3a" }, // R
  { axis: 0, sign: -1, color: "#ff6a13" }, // L
  { axis: 1, sign: 1, color: "#f4f4f4" }, // U
  { axis: 1, sign: -1, color: "#ffd500" }, // D
  { axis: 2, sign: 1, color: "#00a651" }, // F
  { axis: 2, sign: -1, color: "#0051ba" }, // B
];

const DRAG_THRESHOLD = 8; // px before a drag commits to a layer
const TAP_SLOP = 6; // px a pointer may wander and still count as a click
const SNAP_MS = 140;
const SCRAMBLE_MS = 75;
const UNDO_MS = 130;
const SCRAMBLE_LENGTH = 22;

// Geometry and materials are shared by all 26 cubies
const bodyGeometry = new RoundedBoxGeometry(0.97, 0.97, 0.97, 4, 0.1);
const bodyMaterial = new MeshStandardMaterial({ color: "#0c0c10", roughness: 0.45, metalness: 0.1 });

const stickerGeometry = (() => {
  const s = 0.41;
  const r = 0.1;
  const shape = new Shape();
  shape.moveTo(-s + r, -s);
  shape.lineTo(s - r, -s);
  shape.absarc(s - r, -s + r, r, -HALF_PI, 0);
  shape.lineTo(s, s - r);
  shape.absarc(s - r, s - r, r, 0, HALF_PI);
  shape.lineTo(-s + r, s);
  shape.absarc(-s + r, s - r, r, HALF_PI, Math.PI);
  shape.lineTo(-s, -s + r);
  shape.absarc(-s + r, -s + r, r, Math.PI, Math.PI * 1.5);
  return new ShapeGeometry(shape, 6);
})();

const stickerMaterials = FACES.map(
  (f) => new MeshStandardMaterial({ color: f.color, roughness: 0.35, metalness: 0 })
);

const Z = new Vector3(0, 0, 1);

const buildCubies = () => {
  const list = [];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        const home = new Vector3(x, y, z);
        const stickers = [];
        FACES.forEach((f, i) => {
          if (home.getComponent(f.axis) !== f.sign) return;
          const normal = AXIS_VEC[f.axis].clone().multiplyScalar(f.sign);
          stickers.push({
            face: i,
            normal,
            position: normal.clone().multiplyScalar(0.489).toArray(),
            quaternion: new Quaternion().setFromUnitVectors(Z, normal),
          });
        });
        list.push({
          key: `${x}${y}${z}`,
          home,
          stickers,
          pos: home.clone(), // logical grid position (integers)
          quat: new Quaternion(), // logical orientation (multiple of 90°)
          obj: null,
        });
      }
  return list;
};

const _m = new Matrix4();
const _q = new Quaternion();
const _v = new Vector3();
const _a = new Vector3();
const _b = new Vector3();

// Composed quarter turns drift off the 90° lattice; snap back to it
const snapQuaternion = (q) => {
  _m.makeRotationFromQuaternion(q);
  const e = _m.elements;
  for (let i = 0; i < 16; i++) e[i] = Math.round(e[i]);
  q.setFromRotationMatrix(_m);
};

const easeOut = (t) => 1 - (1 - t) * (1 - t);

/**
 * A fully working 3×3×3 cube.
 *
 * `interactive` false → a click on the cube calls `onActivate`, drags orbit.
 * `interactive` true  → dragging a sticker turns that layer; dragging empty
 *                       space still orbits (OrbitControls stays the default).
 *
 * The cube group must stay un-rotated: turn maths assumes local == world.
 */
const RubiksCube = forwardRef(function RubiksCube(
  { interactive, onActivate, onMove, onSolved, onBusyChange },
  ref
) {
  const get = useThree((s) => s.get);
  const cubies = useMemo(buildCubies, []);

  // Mutable game state — lives outside React so turning never re-renders
  const game = useRef({
    turn: null, // { axis, layer, members, angle, phase, from, to, t, ms, quarters, record }
    queue: [], // pending programmatic moves
    history: [],
    scrambled: false,
    pointer: null,
  }).current;

  const props = useRef({});
  props.current = { interactive, onActivate, onMove, onSolved, onBusyChange };

  const api = useMemo(() => {
    const membersOf = (axis, layer) =>
      cubies.filter((c) => Math.round(c.pos.getComponent(axis)) === layer);

    const pose = (turn) => {
      const axis = AXIS_VEC[turn.axis];
      _q.setFromAxisAngle(axis, turn.angle);
      for (const c of turn.members) {
        if (!c.obj) continue;
        c.obj.position.copy(c.pos).applyAxisAngle(axis, turn.angle);
        c.obj.quaternion.copy(_q).multiply(c.quat);
      }
    };

    const sync = (c) => {
      if (!c.obj) return;
      c.obj.position.copy(c.pos);
      c.obj.quaternion.copy(c.quat);
    };

    const isSolved = () => {
      // Whole-cube orientation is free (slice turns move the centres), so just
      // require every direction to show a single colour.
      const seen = new Map();
      for (const c of cubies)
        for (const s of c.stickers) {
          _v.copy(s.normal).applyQuaternion(c.quat);
          const dir = `${Math.round(_v.x)},${Math.round(_v.y)},${Math.round(_v.z)}`;
          if (!seen.has(dir)) seen.set(dir, s.face);
          else if (seen.get(dir) !== s.face) return false;
        }
      return true;
    };

    const commit = (turn) => {
      const quarters = ((turn.quarters % 4) + 4) % 4;
      if (quarters !== 0) {
        const axis = AXIS_VEC[turn.axis];
        _q.setFromAxisAngle(axis, turn.quarters * HALF_PI);
        for (const c of turn.members) {
          c.pos.applyAxisAngle(axis, turn.quarters * HALF_PI).round();
          c.quat.premultiply(_q);
          snapQuaternion(c.quat);
        }
      }
      turn.members.forEach(sync);
      game.turn = null;

      if (quarters === 0) return;
      if (turn.record === "user") {
        game.history.push({ axis: turn.axis, layer: turn.layer, quarters: turn.quarters });
        props.current.onMove?.(1);
      } else if (turn.record === "undo") {
        props.current.onMove?.(-1);
      }
      if (turn.record !== "scramble" && game.scrambled && isSolved()) {
        game.scrambled = false;
        game.history.length = 0;
        props.current.onSolved?.();
      }
    };

    const startQueued = () => {
      const next = game.queue.shift();
      if (!next) return false;
      game.turn = {
        axis: next.axis,
        layer: next.layer,
        members: membersOf(next.axis, next.layer),
        angle: 0,
        phase: "anim",
        from: 0,
        to: next.quarters * HALF_PI,
        t: 0,
        ms: next.ms,
        quarters: next.quarters,
        record: next.record,
        onDone: next.onDone,
      };
      return true;
    };

    const setBusy = (busy) => props.current.onBusyChange?.(busy);

    return {
      membersOf,
      pose,
      commit,
      isSolved,
      startQueued,

      /** Advance animations; called every frame. */
      tick(delta) {
        if (!game.turn && !startQueued()) return;
        const turn = game.turn;
        if (turn.phase !== "anim") return;
        turn.t += (delta * 1000) / turn.ms;
        if (turn.t >= 1) {
          const done = turn.onDone;
          commit(turn);
          done?.();
          // Chain straight into the next queued move so scrambles stay fluid
          startQueued();
          return;
        }
        turn.angle = turn.from + (turn.to - turn.from) * easeOut(turn.t);
        pose(turn);
      },

      /** Finish whatever is animating right now. */
      flush() {
        const turn = game.turn;
        if (turn?.phase === "anim") {
          const done = turn.onDone;
          commit(turn);
          done?.();
        }
      },

      isAutomating: () => game.queue.length > 0 || (game.turn && game.turn.record !== "user"),

      /** Returns false when it could not start (a layer is mid-drag or mid-move). */
      scramble() {
        if (game.turn?.record === "user") this.flush();
        if (game.queue.length || game.turn) return false;
        const moves = [];
        let last = null;
        while (moves.length < SCRAMBLE_LENGTH) {
          const axis = Math.floor(Math.random() * 3);
          const layer = Math.random() < 0.5 ? -1 : 1;
          if (last && last.axis === axis && last.layer === layer) continue;
          const quarters = [1, -1, 2][Math.floor(Math.random() * 3)];
          last = { axis, layer, quarters, ms: SCRAMBLE_MS * Math.abs(quarters), record: "scramble" };
          moves.push(last);
        }
        moves[moves.length - 1].onDone = () => {
          // A random walk can (very rarely) land back on solved
          game.scrambled = !isSolved();
          setBusy(false);
        };
        game.history.length = 0;
        game.scrambled = false;
        game.queue.push(...moves);
        setBusy(true);
        return true;
      },

      reset() {
        game.queue.length = 0;
        game.turn = null;
        game.history.length = 0;
        game.scrambled = false;
        for (const c of cubies) {
          c.pos.copy(c.home);
          c.quat.identity();
          sync(c);
        }
        setBusy(false);
      },

      undo() {
        if (game.turn?.record === "user") this.flush();
        if (game.queue.length || game.turn) return;
        const last = game.history.pop();
        if (!last) return;
        game.queue.push({
          axis: last.axis,
          layer: last.layer,
          quarters: -last.quarters,
          ms: UNDO_MS * Math.abs(last.quarters),
          record: "undo",
        });
      },

      canUndo: () => game.history.length > 0,
    };
  }, [cubies, game]);

  useImperativeHandle(
    ref,
    () => ({
      scramble: () => api.scramble(),
      reset: () => api.reset(),
      undo: () => api.undo(),
      isSolved: api.isSolved,
    }),
    [api]
  );

  useFrame((_, delta) => api.tick(Math.min(delta, 0.1)));

  // ── Pointer handling ───────────────────────────────────────────────────
  const handlers = useMemo(() => {
    // Screen-space vector (px) that one world unit along `dir` covers at `point`
    const screenDir = (point, dir) => {
      const { camera, size } = get();
      _a.copy(point).project(camera);
      _b.copy(point).add(dir).project(camera);
      return {
        x: ((_b.x - _a.x) * size.width) / 2,
        y: (-(_b.y - _a.y) * size.height) / 2,
      };
    };

    const setControls = (enabled) => {
      const controls = get().controls;
      if (controls) controls.enabled = enabled;
    };

    const decide = (p, dx, dy) => {
      // Which face was grabbed: the axis where the hit point sits on the surface
      const pt = p.point;
      let n = 0;
      for (let i = 1; i < 3; i++)
        if (Math.abs(pt.getComponent(i)) > Math.abs(pt.getComponent(n))) n = i;
      const nSign = Math.sign(pt.getComponent(n)) || 1;

      // The drag follows one of the face's two tangent axes
      let best = null;
      for (let t = 0; t < 3; t++) {
        if (t === n) continue;
        const s = screenDir(pt, AXIS_VEC[t]);
        const len = Math.hypot(s.x, s.y);
        if (len < 1e-3) continue;
        const along = (dx * s.x + dy * s.y) / len;
        if (!best || Math.abs(along) > Math.abs(best.along)) best = { t, s, len, along };
      }
      if (!best) return false;

      const axis = 3 - n - best.t; // the remaining axis is the rotation axis
      const layer = Math.max(-1, Math.min(1, Math.round(pt.getComponent(axis))));

      // Rotating +θ about `axis` moves the grabbed point along (axis × normal)
      _v.crossVectors(AXIS_VEC[axis], _a.copy(AXIS_VEC[n]).multiplyScalar(nSign));
      const dirSign = Math.sign(_v.dot(AXIS_VEC[best.t])) || 1;

      api.flush();
      if (game.turn) return false;
      p.ux = best.s.x / best.len;
      p.uy = best.s.y / best.len;
      // px of drag → radians: arc length over the radius of the grabbed point
      p.radPerPx = dirSign / (best.len * 1.5);
      game.turn = {
        axis,
        layer,
        members: api.membersOf(axis, layer),
        angle: 0,
        phase: "drag",
        record: "user",
      };
      return true;
    };

    const onMove = (e) => {
      const p = game.pointer;
      if (!p || e.pointerId !== p.id) return;
      const dx = e.clientX - p.x0;
      const dy = e.clientY - p.y0;
      p.moved = Math.max(p.moved, Math.hypot(dx, dy));
      if (p.mode !== "turn") return;

      if (!p.decided) {
        if (p.moved < DRAG_THRESHOLD) return;
        p.decided = decide(p, dx, dy);
        if (!p.decided) return;
      }
      const turn = game.turn;
      if (!turn || turn.phase !== "drag") return;
      turn.angle = (dx * p.ux + dy * p.uy) * p.radPerPx;
      // Stay inside a half turn either way
      turn.angle = Math.max(-Math.PI, Math.min(Math.PI, turn.angle));
      api.pose(turn);
    };

    const end = (e, cancelled) => {
      const p = game.pointer;
      if (!p || e.pointerId !== p.id) return;
      game.pointer = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      setControls(true);

      if (p.mode === "tap") {
        if (!cancelled && p.moved < TAP_SLOP) props.current.onActivate?.();
        return;
      }

      const turn = game.turn;
      if (!turn || turn.phase !== "drag") return;
      let quarters = Math.round(turn.angle / HALF_PI);
      // A short, deliberate drag still counts as a quarter turn
      if (quarters === 0 && Math.abs(turn.angle) > 0.3 && !cancelled) quarters = Math.sign(turn.angle);
      const to = quarters * HALF_PI;
      turn.phase = "anim";
      turn.from = turn.angle;
      turn.to = to;
      turn.t = 0;
      turn.ms = Math.max(60, (SNAP_MS * Math.abs(to - turn.angle)) / (HALF_PI / 2));
      turn.quarters = quarters;
    };
    const onUp = (e) => end(e, false);
    const onCancel = (e) => end(e, true);

    const onPointerDown = (e) => {
      if (game.pointer) return;
      const ne = e.nativeEvent;
      if (ne.pointerType === "mouse" && ne.button !== 0) return;
      e.stopPropagation();

      const turning = props.current.interactive && !api.isAutomating();
      game.pointer = {
        id: ne.pointerId,
        x0: ne.clientX,
        y0: ne.clientY,
        point: e.point.clone(),
        moved: 0,
        mode: props.current.interactive ? (turning ? "turn" : "ignore") : "tap",
        decided: false,
      };
      // R3F's handler runs before OrbitControls' own pointerdown listener, so
      // disabling here stops the camera from orbiting during a layer drag.
      if (turning) setControls(false);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onCancel);
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      game.pointer = null;
      document.body.style.cursor = "";
    };

    return { onPointerDown, cleanup };
  }, [api, game, get]);

  useEffect(() => handlers.cleanup, [handlers]);

  // Place the cubies once; after that only turns move them (no position props,
  // so a parent re-render can never snap a half-dragged layer back).
  useLayoutEffect(() => {
    for (const c of cubies) {
      c.obj?.position.copy(c.pos);
      c.obj?.quaternion.copy(c.quat);
    }
  }, [cubies]);

  return (
    <group>
      {cubies.map((c) => (
        <group
          key={c.key}
          ref={(obj) => {
            c.obj = obj;
          }}
        >
          <mesh geometry={bodyGeometry} material={bodyMaterial} />
          {c.stickers.map((s) => (
            <mesh
              key={s.face}
              geometry={stickerGeometry}
              material={stickerMaterials[s.face]}
              position={s.position}
              quaternion={s.quaternion}
            />
          ))}
        </group>
      ))}

      {/* One invisible 3×3×3 box takes all pointer hits: the hit point alone
          tells us the face and the layer, and it is a single cheap raycast. */}
      <mesh
        onPointerDown={handlers.onPointerDown}
        onPointerOver={() => {
          document.body.style.cursor = interactive ? "grab" : "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
});

export default RubiksCube;
