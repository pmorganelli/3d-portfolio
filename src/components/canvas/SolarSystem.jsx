import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls, Decal, Preload, useTexture } from '@react-three/drei'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

import CanvasLoader from '../Loader'
import TechProjectLinks from '../TechProjectLinks'
import { makeLabelTexture, LBL_W, LBL_H, LBL_PILL_H } from './labelTexture'

// ─── Orbit ring ───────────────────────────────────────────────────────────────
const OrbitRing = ({ radius, color }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius - 0.04, radius + 0.04, 128]} />
    <meshBasicMaterial
      color={color || '#8899cc'}
      transparent
      opacity={0.22}
      side={THREE.DoubleSide}
    />
  </mesh>
);

// ─── Hover ────────────────────────────────────────────────────────────────────
// Tracks hover for one body, sets the pointer cursor, and counts hovered bodies
// in the shared `hoverCount` ref so the scene can slow the orbits while the
// pointer is over something (moving planets are hard to click).
// Reset on unmount too: crossing the mobile breakpoint while a planet is hovered
// unmounts the scene without ever firing onPointerOut, leaving the whole page
// stuck with a pointer cursor.
const useHover = (hoverCount) => {
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);

  const set = useCallback((next) => {
    if (hoveredRef.current === next) return;
    hoveredRef.current = next;
    hoverCount.current += next ? 1 : -1;
    document.body.style.cursor = hoverCount.current > 0 ? 'pointer' : 'auto';
    setHovered(next);
  }, [hoverCount]);

  useEffect(() => () => {
    if (hoveredRef.current) hoverCount.current -= 1;
    document.body.style.cursor = 'auto';
  }, [hoverCount]);

  const onPointerOver = useCallback((e) => { e.stopPropagation(); set(true); }, [set]);
  const onPointerOut  = useCallback(() => set(false), [set]);
  return { hovered, onPointerOver, onPointerOut };
};

// ─── Label sprite ─────────────────────────────────────────────────────────────
// CanvasTextures hold GPU memory that useMemo alone never reclaims — dispose on
// unmount so toggling the desktop/mobile breakpoint doesn't leak a set per pass.
const useLabelTexture = (name, tag, color) => {
  const labelTex = useMemo(() => makeLabelTexture(name, tag, color), [name, tag, color]);
  useEffect(() => () => labelTex.dispose(), [labelTex]);
  return labelTex;
};

// Labels are sized in *screen* pixels, not world units: a world-sized label is
// ~2px text from the home camera and oversized when zoomed in. Each frame the
// sprite is rescaled from its distance to the camera so the texture is drawn at
// a fixed fraction of its native resolution.
const LABEL_REST_SCALE   = 0.62; // fraction of native size while idle
const LABEL_ACTIVE_SCALE = 1;    // hovered / selected
const LABEL_GAP_PX       = 6;    // gap between the body and its pill
const _labelPos = new THREE.Vector3();
const _labelUp  = new THREE.Vector3();

const Label = ({ texture, radius, active }) => {
  const ref   = useRef();
  const scale = useRef(LABEL_REST_SCALE);

  useFrame(({ camera, size }, delta) => {
    const sprite = ref.current;
    if (!sprite) return;
    const target = active ? LABEL_ACTIVE_SCALE : LABEL_REST_SCALE;
    scale.current = THREE.MathUtils.damp(scale.current, target, 10, delta);

    sprite.parent.getWorldPosition(_labelPos);
    const dist       = camera.position.distanceTo(_labelPos);
    const unitsPerPx = (2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)) / size.height;
    const k          = unitsPerPx * scale.current;

    sprite.scale.set(LBL_W * k, LBL_H * k, 1);
    // Hang the pill below the body along the *camera's* down axis. Offsetting
    // along world -Y tucked it behind the planet whenever the camera looked
    // down on the system (i.e. always, once zoomed in on a selection).
    const offset = radius + LABEL_GAP_PX * unitsPerPx + (LBL_PILL_H / 2) * k;
    _labelUp.set(0, 1, 0).applyQuaternion(camera.quaternion);
    sprite.position.copy(_labelUp).multiplyScalar(-offset);
  });

  return (
    <sprite ref={ref} renderOrder={active ? 2 : 1}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
};

// ─── Shared decal pattern ─────────────────────────────────────────────────────
const SixDecals = ({ decal, decalScale = 1 }) => (
  <>
    <Decal position={[0, 0,  1]} rotation={[2 * Math.PI, 0, 6.25]}        scale={decalScale} map={decal} />
    <Decal position={[0, 0, -1]} rotation={[2 * Math.PI, Math.PI, 6.25]}  scale={decalScale} map={decal} />
    <Decal position={[0,  1, 0]} rotation={[Math.PI / 2, 0, 6.25]}        scale={decalScale} map={decal} />
    <Decal position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 6.25]}       scale={decalScale} map={decal} />
    <Decal position={[ 1, 0, 0]} rotation={[0,  Math.PI / 2, 6.25]}       scale={decalScale} map={decal} />
    <Decal position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 6.25]}       scale={decalScale} map={decal} />
  </>
);

const HOVER_SCALE = 1.12;

// ─── Sun ─────────────────────────────────────────────────────────────────────
const Sun = ({ tech, onSelect, isSelected, hoverCount, motionScale }) => {
  const [decal]  = useTexture([tech.icon]);
  const meshRef  = useRef();

  const labelTex = useLabelTexture(tech.name, tech.tag, tech.color);
  const hover    = useHover(hoverCount);

  const s = tech.size;

  // Delta-scaled so the spin is the same speed on 60Hz and 120Hz displays
  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += 0.18 * delta * motionScale;
    mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, s * (hover.hovered ? 1.04 : 1), 10, delta));
  });

  const emissiveIntensity = isSelected ? 0.7 : hover.hovered ? 0.6 : 0.45;

  return (
    <group>
      <pointLight color={tech.color} intensity={4} distance={35} decay={1.4} />

      <mesh
        ref={meshRef}
        scale={s}
        onClick={(e) => { e.stopPropagation(); onSelect(tech); }}
        onPointerOver={hover.onPointerOver}
        onPointerOut={hover.onPointerOut}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={emissiveIntensity}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <SixDecals decal={decal} decalScale={tech.decalScale ?? 1} />
      </mesh>

      <Label texture={labelTex} radius={s} active={isSelected || hover.hovered} />
    </group>
  );
};

// ─── Planet ───────────────────────────────────────────────────────────────────
// Outer group carries the orbit position; inner mesh self-rotates.
// planetPositions is a shared Map<name, Vector3> updated each frame.
const Planet = ({ tech, planetPositions, onSelect, isSelected, hoverCount, timeScale, motionScale }) => {
  const [decal]   = useTexture([tech.icon]);
  const orbitRef  = useRef();
  const meshRef   = useRef();
  // Accumulated here rather than derived from clock.elapsedTime: R3F zeroes the
  // clock whenever `frameloop` changes, so every planet used to jump back to
  // its starting angle each time the section scrolled back into view.
  const angle     = useRef(tech.angleOffset);

  const labelTex = useLabelTexture(tech.name, tech.tag, tech.color);
  const hover    = useHover(hoverCount);

  const s = tech.size;

  useFrame((_, delta) => {
    angle.current += tech.orbitSpeed * delta * timeScale.current;
    const x = Math.cos(angle.current) * tech.orbitRadius;
    const z = Math.sin(angle.current) * tech.orbitRadius;

    if (orbitRef.current) orbitRef.current.position.set(x, 0, z);

    // Keep the shared map current so CameraController can zoom to correct position
    let v = planetPositions.current.get(tech.name);
    if (!v) { v = new THREE.Vector3(); planetPositions.current.set(tech.name, v); }
    v.set(x, 0, z);

    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += 0.48 * delta * motionScale;
    mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, s * (hover.hovered ? HOVER_SCALE : 1), 10, delta));
  });

  const lit = isSelected || hover.hovered;

  return (
    <group
      ref={orbitRef}
      onClick={(e) => { e.stopPropagation(); onSelect(tech); }}
      onPointerOver={hover.onPointerOver}
      onPointerOut={hover.onPointerOut}
    >
      <mesh ref={meshRef} scale={s}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={lit ? tech.color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : hover.hovered ? 0.2 : 0}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <SixDecals decal={decal} decalScale={tech.decalScale ?? 1} />
      </mesh>

      {/* Invisible, larger hit target — the small inner planets are otherwise a
          ~25px moving target from the home camera */}
      <mesh>
        <sphereGeometry args={[Math.max(s * 1.25, 1.5), 12, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Label texture={labelTex} radius={s * (hover.hovered ? HOVER_SCALE : 1)} active={lit} />
    </group>
  );
};

// ─── Scene ────────────────────────────────────────────────────────────────────
// Scratch vectors reused across frames — avoids per-frame allocation
const _sunPos      = new THREE.Vector3(0, 0, 0);
const _sunRadial   = new THREE.Vector3(1, 0, 1).normalize();
const _radial      = new THREE.Vector3();
const _camPos      = new THREE.Vector3();
// Matches the intent of OrbitControls autoRotateSpeed=0.4 (2π/30s per speed unit)
const IDLE_ROTATE_SPEED = 0.4 * ((2 * Math.PI) / 30) / 2; // rad/s ≈ 0.042
// Orbits slow to this fraction of full speed while the pointer is over a body
const HOVER_TIME_SCALE = 0.12;

const SolarSystemScene = ({ technologies, selectedTech, onSelectTech, reducedMotion }) => {
  const cameraRef       = useRef();
  const planetPositions = useRef(new Map());
  const hoverCount      = useRef(0);
  const timeScale       = useRef(reducedMotion ? 0 : 1);
  const motionScale     = reducedMotion ? 0 : 1;

  const sun     = technologies.find(t => t.isSun);
  const planets = technologies.filter(t => !t.isSun);

  // ── Return camera home when the selection is cleared ────────────────────────
  useEffect(() => {
    if (!cameraRef.current) return;
    if (!selectedTech) cameraRef.current.setLookAt(0, 11, 38, 0, 0, 0, true);
  }, [selectedTech]);

  // ── Idle auto-rotation + selected-planet tracking ────────────────────────────
  // camera-controls has no autoRotate API, so drive the azimuth manually; while
  // a planet is selected, re-target every frame so it can't orbit out of frame.
  useFrame((_, delta) => {
    const target = reducedMotion ? 0 : hoverCount.current > 0 ? HOVER_TIME_SCALE : 1;
    timeScale.current = THREE.MathUtils.damp(timeScale.current, target, 6, delta);

    const cc = cameraRef.current;
    if (!cc) return;

    if (!selectedTech) {
      // enableTransition must be true: `false` copies the end angles onto the
      // current ones, which cut the glide back home short (the angle snapped
      // while only distance/target eased) and stripped the damping off drags.
      if (!reducedMotion) cc.rotate(IDLE_ROTATE_SPEED * delta, 0, true);
      return;
    }

    const pos = selectedTech.isSun
      ? _sunPos
      : planetPositions.current.get(selectedTech.name);
    if (!pos) return;

    const d = selectedTech.size * 5 + 5;

    // Place camera radially outward from sun + upward so it's behind+above planet
    const radial = selectedTech.isSun
      ? _sunRadial
      : _radial.set(pos.x, 0, pos.z).normalize();

    const camPos = _camPos.copy(pos).addScaledVector(radial, d * 0.7);
    camPos.y += d * 0.45;

    // enableTransition=true every frame gives a smooth damped follow
    cc.setLookAt(camPos.x, camPos.y, camPos.z, pos.x, pos.y, pos.z, true);
  });

  // ── Disable scroll zoom / right-click truck on mount ────────────────────────
  useEffect(() => {
    if (!cameraRef.current) return;
    const cc = cameraRef.current;
    cc.mouseButtons.wheel  = 0; // ACTION.NONE — prevents scroll capture
    cc.mouseButtons.right  = 0;
    cc.mouseButtons.middle = 0;
    cc.touches.two         = 0; // disable pinch zoom
    cc.touches.three       = 0;
  }, []);

  return (
    <>
      {/* The sun's point light falls off to a few percent by the outer rings,
          so the fill has to carry them — at 0.25 the outer planets were
          near-black and their logos unreadable. */}
      <ambientLight intensity={0.75} />
      <hemisphereLight intensity={0.5} color="#dbe7ff" groundColor="#1a1a2e" />

      <CameraControls ref={cameraRef} makeDefault />

      {/* One ring per unique orbit radius — deduplicates shared orbits */}
      {[...new Map(planets.map(t => [t.orbitRadius, t])).values()].map(t => (
        <OrbitRing key={`ring-${t.orbitRadius}`} radius={t.orbitRadius} />
      ))}

      {sun && (
        <Sun
          tech={sun}
          onSelect={onSelectTech}
          isSelected={selectedTech?.name === sun.name}
          hoverCount={hoverCount}
          motionScale={motionScale}
        />
      )}

      {planets.map(t => (
        <Planet
          key={t.name}
          tech={t}
          planetPositions={planetPositions}
          onSelect={onSelectTech}
          isSelected={selectedTech?.name === t.name}
          hoverCount={hoverCount}
          timeScale={timeScale}
          motionScale={motionScale}
        />
      ))}
    </>
  );
};

// ─── Planet info card (DOM overlay) ──────────────────────────────────────────
const PlanetCard = ({ tech, onClose }) => {
  const borderColor = `${tech.color}44`;
  const accentBg    = `${tech.color}18`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 72 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 72 }}
      transition={{ type: 'spring', damping: 22, stiffness: 220 }}
      className="absolute top-4 right-4 w-72 max-h-[90%] overflow-y-auto
                 rounded-2xl p-6 z-10"
      style={{
        background: 'rgba(10, 8, 28, 0.92)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${borderColor}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-9 h-9 object-contain shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-white font-bold text-base leading-tight truncate">
              {tech.name}
            </h3>
            <p className="text-xs mt-0.5 truncate" style={{ color: tech.color }}>
              {tech.info.orbits}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                     text-white/40 hover:text-white hover:bg-white/10 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Level badge */}
      <div className="mb-4">
        <span
          className="text-xs px-2.5 py-1 rounded-full border font-medium"
          style={{ color: tech.color, borderColor, background: accentBg }}
        >
          {tech.info.level}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/65 text-sm leading-relaxed mb-5">
        {tech.info.description}
      </p>

      {/* Projects */}
      {tech.info.projects.length > 0 && (
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2.5">
            Projects
          </p>
          <TechProjectLinks
            projects={tech.info.projects}
            color={tech.color}
            onNavigate={onClose}
          />
        </div>
      )}
    </motion.div>
  );
};

// ─── Canvas + overlay wrapper ─────────────────────────────────────────────────
const SolarSystemCanvas = ({ technologies }) => {
  const [selectedTech, setSelectedTech] = useState(null);
  const containerRef = useRef(null);
  // Stop rendering while the section is off screen
  const inView = useInView(containerRef, { margin: '200px 0px' });
  const reducedMotion = useReducedMotion();

  // When a planet is selected, ensure the card (top-right of the canvas) is in view
  useEffect(() => {
    if (!selectedTech || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const navbarHeight = 80;
    if (rect.top < navbarHeight) {
      window.scrollTo({
        top: window.scrollY + rect.top - navbarHeight,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [selectedTech, reducedMotion]);

  // Escape closes the card
  useEffect(() => {
    if (!selectedTech) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelectedTech(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedTech]);

  const toggle = useCallback(
    (tech) => setSelectedTech((cur) => (cur?.name === tech.name ? null : tech)),
    []
  );

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Canvas
        className="scroll-safe"
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 2]}
        camera={{ position: [0, 11, 38], fov: 72 }}
        // A click on empty space deselects. This replaces a full-canvas backdrop
        // div, which swallowed every click — so picking another planet while
        // one was open only closed the card instead of switching to it.
        onPointerMissed={() => setSelectedTech(null)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <SolarSystemScene
            technologies={technologies}
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
            reducedMotion={reducedMotion}
          />
        </Suspense>
        <Preload all />
      </Canvas>

      <AnimatePresence>
        {selectedTech && (
          <PlanetCard
            key={selectedTech.name}
            tech={selectedTech}
            onClose={() => setSelectedTech(null)}
          />
        )}
      </AnimatePresence>

      {/* Keyboard- and screen-reader-reachable way into the same info cards,
          and readable names for every body at any zoom level */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex flex-col items-center gap-2 px-3">
        {!selectedTech && (
          <span className="px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/10 border border-white/10 backdrop-blur-sm">
            Click a planet to explore · drag to rotate
          </span>
        )}
        <ul className="flex flex-wrap justify-center gap-1.5 list-none" aria-label="Technologies">
          {technologies.map((tech) => {
            const active = selectedTech?.name === tech.name;
            return (
              <li key={tech.name}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(tech)}
                  className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                             border backdrop-blur-sm transition-colors outline-none
                             focus-visible:ring-2 focus-visible:ring-white/70"
                  style={{
                    color: active ? '#fff' : 'rgba(255,255,255,0.75)',
                    borderColor: active ? tech.color : 'rgba(255,255,255,0.12)',
                    background: active ? `${tech.color}55` : 'rgba(10, 8, 28, 0.7)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: tech.color }} />
                  {tech.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SolarSystemCanvas;
