import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls, Decal, Preload, useTexture } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import * as THREE from 'three'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

import CanvasLoader from '../Loader'

// ─── Label texture (mirrors Ball.jsx) ────────────────────────────────────────
const LBL_W   = 320;
const LBL_H   = 88;
const NAME_F  = 'bold 15px system-ui, -apple-system, sans-serif';
const TAG_F   = '11px system-ui, -apple-system, sans-serif';
const TEXT_LH = 22;

function makeLabelTexture(name, tag, color) {
  const canvas  = document.createElement('canvas');
  canvas.width  = LBL_W;
  canvas.height = LBL_H;
  const ctx = canvas.getContext('2d');

  const namePrepared = prepareWithSegments(name, NAME_F);
  const tagPrepared  = tag ? prepareWithSegments(tag, TAG_F) : null;

  const nameW = layoutWithLines(namePrepared, 4000, TEXT_LH).lines[0]?.width ?? 0;
  const tagW  = tagPrepared
    ? layoutWithLines(tagPrepared, 4000, TEXT_LH).lines[0]?.width ?? 0
    : 0;

  const dotR = 5, dotGap = 7, segGap = 9, chipPadX = 9, chipPadY = 3;
  const pillPadX = 14, pillPadY = 10;
  const chipW    = tag ? tagW + chipPadX * 2 : 0;
  const chipH    = TEXT_LH - 4;
  const contentW = dotR * 2 + dotGap + nameW + (tag ? segGap + chipW : 0);
  const pillW    = Math.min(contentW + pillPadX * 2, LBL_W - 8);
  const pillH    = TEXT_LH + pillPadY * 2;
  const pillX    = (LBL_W - pillW) / 2;
  const pillY    = (LBL_H - pillH) / 2;
  const pillR    = pillH / 2;
  const baseline = pillY + pillPadY + TEXT_LH * 0.76;
  let   curX     = pillX + pillPadX;

  ctx.fillStyle = 'rgba(6, 8, 16, 0.90)';
  ctx.beginPath(); ctx.roundRect(pillX, pillY, pillW, pillH, pillR); ctx.fill();

  ctx.strokeStyle = color ? `${color}50` : 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(pillX, pillY, pillW, pillH, pillR); ctx.stroke();

  ctx.beginPath();
  ctx.arc(curX + dotR, baseline - dotR * 0.3, dotR, 0, Math.PI * 2);
  ctx.fillStyle = color || '#ffffff'; ctx.fill();
  curX += dotR * 2 + dotGap;

  ctx.font = NAME_F; ctx.fillStyle = '#f2f2f2';
  ctx.fillText(name, curX, baseline);
  curX += nameW + segGap;

  if (tag && tagPrepared) {
    const chipX = curX;
    const chipY = pillY + (pillH - chipH) / 2;
    ctx.fillStyle = color ? `${color}22` : 'rgba(255,255,255,0.08)';
    ctx.beginPath(); ctx.roundRect(chipX, chipY, chipW, chipH, chipH / 2); ctx.fill();
    ctx.strokeStyle = color ? `${color}55` : 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(chipX, chipY, chipW, chipH, chipH / 2); ctx.stroke();
    ctx.font = TAG_F;
    ctx.fillStyle = color ? lighten(color, 0.3) : '#aaaaaa';
    ctx.fillText(tag, chipX + (chipW - tagW) / 2, chipY + chipH * 0.72);
  }

  return new THREE.CanvasTexture(canvas);
}

function lighten(hex, ratio) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c) => Math.round(c + (255 - c) * ratio);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

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

// ─── Shared decal pattern ─────────────────────────────────────────────────────
const SixDecals = ({ decal, decalScale = 1 }) => (
  <>
    <Decal position={[0, 0,  1]} rotation={[2 * Math.PI, 0, 6.25]}        scale={decalScale} map={decal} flatShading />
    <Decal position={[0, 0, -1]} rotation={[2 * Math.PI, Math.PI, 6.25]}  scale={decalScale} map={decal} flatShading />
    <Decal position={[0,  1, 0]} rotation={[Math.PI / 2, 0, 6.25]}        scale={decalScale} map={decal} flatShading />
    <Decal position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 6.25]}       scale={decalScale} map={decal} flatShading />
    <Decal position={[ 1, 0, 0]} rotation={[0,  Math.PI / 2, 6.25]}       scale={decalScale} map={decal} flatShading />
    <Decal position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 6.25]}       scale={decalScale} map={decal} flatShading />
  </>
);

// ─── Sun ─────────────────────────────────────────────────────────────────────
const Sun = ({ tech, onSelect, isSelected }) => {
  const [decal]  = useTexture([tech.icon]);
  const meshRef  = useRef();

  const labelTex = useMemo(
    () => makeLabelTexture(tech.name, tech.tag, tech.color),
    [tech.name, tech.tag, tech.color]
  );

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.003;
  });

  const s = tech.size;
  const emissiveIntensity = isSelected ? 0.7 : 0.45;
  const lblW = s * 2.2;
  const lblH = lblW * (LBL_H / LBL_W);

  return (
    <group>
      <pointLight color={tech.color} intensity={4} distance={35} decay={1.4} />

      <mesh
        ref={meshRef}
        scale={s}
        castShadow
        receiveShadow
        onClick={(e) => { e.stopPropagation(); onSelect(tech); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
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

      <sprite position={[0, -(s + lblH * 0.5 + 0.4), 0]} scale={[lblW, lblH, 1]}>
        <spriteMaterial map={labelTex} transparent depthWrite={false} />
      </sprite>
    </group>
  );
};

// ─── Planet ───────────────────────────────────────────────────────────────────
// Outer group carries the orbit position; inner mesh self-rotates.
// planetPositions is a shared Map<name, Vector3> updated each frame.
const Planet = ({ tech, planetPositions, onSelect, isSelected }) => {
  const [decal]   = useTexture([tech.icon]);
  const orbitRef  = useRef();
  const meshRef   = useRef();

  const labelTex = useMemo(
    () => makeLabelTexture(tech.name, tech.tag, tech.color),
    [tech.name, tech.tag, tech.color]
  );

  useFrame(({ clock }) => {
    const t     = clock.getElapsedTime();
    const angle = t * tech.orbitSpeed + tech.angleOffset;
    const x     = Math.cos(angle) * tech.orbitRadius;
    const z     = Math.sin(angle) * tech.orbitRadius;

    if (orbitRef.current) orbitRef.current.position.set(x, 0, z);

    // Keep the shared map current so CameraController can zoom to correct position
    let v = planetPositions.current.get(tech.name);
    if (!v) { v = new THREE.Vector3(); planetPositions.current.set(tech.name, v); }
    v.set(x, 0, z);

    if (meshRef.current) meshRef.current.rotation.y += 0.008;
  });

  const s = tech.size;
  const lblW = Math.max(s * 2.2, 3.0);
  const lblH = lblW * (LBL_H / LBL_W);

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        scale={s}
        castShadow
        onClick={(e) => { e.stopPropagation(); onSelect(tech); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={isSelected ? tech.color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <SixDecals decal={decal} decalScale={tech.decalScale ?? 1} />
      </mesh>

      <sprite position={[0, -(s + lblH * 0.5 + 0.4), 0]} scale={[lblW, lblH, 1]}>
        <spriteMaterial map={labelTex} transparent depthWrite={false} />
      </sprite>
    </group>
  );
};

// ─── Scene ────────────────────────────────────────────────────────────────────
const SolarSystemScene = ({ technologies, selectedTech, onSelectTech }) => {
  const cameraRef      = useRef();
  const planetPositions = useRef(new Map());

  const sun     = technologies.find(t => t.isSun);
  const planets = technologies.filter(t => !t.isSun);

  // ── Camera animation when selection changes ─────────────────────────────────
  useEffect(() => {
    if (!cameraRef.current) return;
    const cc = cameraRef.current;

    if (selectedTech) {
      const pos = selectedTech.isSun
        ? new THREE.Vector3(0, 0, 0)
        : (planetPositions.current.get(selectedTech.name) ?? new THREE.Vector3());

      const d = selectedTech.size * 5 + 5;

      // Place camera radially outward from sun + upward so it's behind+above planet
      const radial = selectedTech.isSun
        ? new THREE.Vector3(1, 0, 1).normalize()
        : new THREE.Vector3(pos.x, 0, pos.z).normalize();

      const camPos = pos.clone()
        .add(radial.multiplyScalar(d * 0.7))
        .add(new THREE.Vector3(0, d * 0.45, 0));

      cc.setLookAt(camPos.x, camPos.y, camPos.z, pos.x, pos.y, pos.z, true);
      cc.autoRotate = false;
    } else {
      cc.setLookAt(0, 11, 38, 0, 0, 0, true);
      cc.autoRotate = true;
    }
  }, [selectedTech]);

  // ── Disable scroll zoom / right-click truck on mount ────────────────────────
  useEffect(() => {
    if (!cameraRef.current) return;
    const cc = cameraRef.current;
    cc.mouseButtons.wheel  = 0; // ACTION.NONE — prevents scroll capture
    cc.mouseButtons.right  = 0;
    cc.mouseButtons.middle = 0;
    cc.touches.two         = 0; // disable pinch zoom
    cc.touches.three       = 0;
    cc.autoRotate          = true;
    cc.autoRotateSpeed     = 0.4;
  }, []);

  return (
    <>
      <ambientLight intensity={0.25} />

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
        />
      )}

      {planets.map(t => (
        <Planet
          key={t.name}
          tech={t}
          planetPositions={planetPositions}
          onSelect={onSelectTech}
          isSelected={selectedTech?.name === t.name}
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
          <div className="flex flex-col gap-2">
            {tech.info.projects.map(p => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
              >
                <span className="text-sm" style={{ color: tech.color }}>→</span>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ─── Canvas + overlay wrapper ─────────────────────────────────────────────────
const SolarSystemCanvas = ({ technologies }) => {
  const [selectedTech, setSelectedTech] = useState(null);

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 11, 38], fov: 72 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <SolarSystemScene
            technologies={technologies}
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
          />
        </Suspense>
        <Preload all />
      </Canvas>

      {/* Click backdrop to deselect */}
      {selectedTech && (
        <div
          className="absolute inset-0 z-0"
          onClick={() => setSelectedTech(null)}
        />
      )}

      <AnimatePresence>
        {selectedTech && (
          <PlanetCard
            key={selectedTech.name}
            tech={selectedTech}
            onClose={() => setSelectedTech(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolarSystemCanvas;
