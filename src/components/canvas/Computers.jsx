import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import RubiksCube from "./RubiksCube";

// Radius of the sphere a 3×3×3 cube sweeps — corners stay inside it mid-turn
const CUBE_RADIUS = 1.5 * Math.sqrt(3);

// Keeps the whole cube in frame at any canvas size by setting the camera's
// distance (direction is left to OrbitControls). Replaces drei <Bounds>, which
// re-measures its children and so would refit whenever a layer is mid-turn.
const FitCamera = ({ margin = 1 }) => {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useLayoutEffect(() => {
    const vHalf = (camera.fov * Math.PI) / 360;
    const hHalf = Math.atan(Math.tan(vHalf) * (size.width / size.height));
    camera.position.setLength((CUBE_RADIUS * margin) / Math.sin(Math.min(vHalf, hHalf)));
    camera.updateProjectionMatrix();
  }, [camera, size, margin]);

  return null;
};

const formatTime = (ms) => {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

const hudButton =
  "px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 " +
  "border border-white/15 backdrop-blur-sm transition-colors hover:bg-white/20 " +
  "disabled:opacity-40 disabled:hover:bg-white/10 disabled:cursor-not-allowed";

const ComputersCanvas = () => {
  // Read the breakpoint up front: R3F applies the `camera` prop only when the
  // canvas is created, so a value corrected after mount never reaches the fov.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Stop rendering once the hero has scrolled away
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { margin: "200px 0px" });
  const reducedMotion = useReducedMotion();

  // ── Game state ─────────────────────────────────────────────────────────
  const cubeRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false); // scramble in progress
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [solved, setSolved] = useState(false);
  const startRef = useRef(null); // timestamp of the first move, null = stopped
  const [running, setRunning] = useState(false);

  const resetStats = useCallback(() => {
    startRef.current = null;
    setRunning(false);
    setMoves(0);
    setElapsed(0);
    setSolved(false);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (startRef.current != null) setElapsed(performance.now() - startRef.current);
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  const scramble = useCallback(() => {
    // Only clear the stats if the scramble actually started — the cube refuses
    // while a layer is mid-drag, and the attempt in progress should survive.
    if (cubeRef.current?.scramble()) resetStats();
  }, [resetStats]);

  const handleActivate = useCallback(() => {
    setPlaying(true);
    // First click on a pristine cube: mix it up so there is something to solve
    if (cubeRef.current?.isSolved()) scramble();
  }, [scramble]);

  const handleMove = useCallback(
    (delta) => {
      if (delta > 0 && startRef.current == null) {
        // First move after a scramble / reset / solve starts a fresh attempt
        startRef.current = performance.now();
        setElapsed(0);
        setSolved(false);
        setMoves(1);
        setRunning(true);
        return;
      }
      setMoves((m) => Math.max(0, m + delta));
    },
    []
  );

  const handleSolved = useCallback(() => {
    if (startRef.current != null) setElapsed(performance.now() - startRef.current);
    startRef.current = null;
    setRunning(false);
    setSolved(true);
  }, []);

  const handleReset = useCallback(() => {
    cubeRef.current?.reset();
    resetStats();
  }, [resetStats]);

  // Escape leaves play mode
  useEffect(() => {
    if (!playing) return;
    const onKey = (e) => {
      if (e.key === "Escape") setPlaying(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  return (
    <div ref={wrapRef} className="relative w-full h-full select-none">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [4.4, 3.5, 5.6], fov: isMobile ? 52 : 46, near: 0.1, far: 100 }}
        gl={{ antialias: true }}
        // While playing, the canvas owns every touch gesture (layer drags go
        // in all directions); otherwise vertical swipes still scroll the page.
        className={playing ? "" : "scroll-safe"}
        style={{ width: "100%", height: "100%", touchAction: playing ? "none" : "pan-y" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 5]} intensity={1.3} />
        <directionalLight position={[-6, -5, -6]} intensity={0.7} />
        <hemisphereLight intensity={0.3} groundColor={"#222"} />

        {/* No Suspense/loader: the cube is built in code, nothing here loads */}
        <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.9}
            autoRotate={!playing && !reducedMotion}
            autoRotateSpeed={0.6}
            minPolarAngle={0.05}
            maxPolarAngle={Math.PI - 0.05}
            target={[0, 0, 0]}
          />

          <FitCamera />
          <RubiksCube
            ref={cubeRef}
            interactive={playing}
            onActivate={handleActivate}
            onMove={handleMove}
            onSolved={handleSolved}
            onBusyChange={setBusy}
          />
      </Canvas>

      {/* HUD — plain DOM over the canvas */}
      {!playing && (
        <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center">
          <span className="px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/10 border border-white/10 backdrop-blur-sm">
            Click the cube to solve it
          </span>
        </div>
      )}

      {playing && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center gap-1">
            <div
              role="status"
              aria-live="polite"
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tabular-nums backdrop-blur-sm border ${
                solved
                  ? "text-white border-blue-300/50 bg-gradient-to-r from-blue-400/80 to-blue-800/80"
                  : "text-white/90 border-white/10 bg-white/10"
              }`}
            >
              {solved
                ? `Solved! ${moves} moves · ${formatTime(elapsed)}`
                : busy
                  ? "Scrambling…"
                  : !running
                    ? "Drag a face to turn it · drag outside to rotate"
                    : `${moves} ${moves === 1 ? "move" : "moves"} · ${formatTime(elapsed)}`}
            </div>
            {/* Once the counter replaces the instructions, keep the orbit tip
                around — it sits outside the live region so it isn't re-read */}
            {!solved && !busy && running && (
              <span className="text-[11px] font-medium text-white/60">
                Drag outside the cube to rotate it
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2">
            <button type="button" className={hudButton} onClick={scramble} disabled={busy}>
              Scramble
            </button>
            <button
              type="button"
              className={hudButton}
              onClick={() => cubeRef.current?.undo()}
              disabled={busy || solved || moves === 0}
            >
              Undo
            </button>
            <button type="button" className={hudButton} onClick={handleReset}>
              Reset
            </button>
            <button type="button" className={hudButton} onClick={() => setPlaying(false)}>
              Done
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ComputersCanvas;
