import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

import CanvasLoader from '../Loader'

// ─── Label texture constants ──────────────────────────────────────────────────
const LBL_W    = 320;   // canvas pixel width
const LBL_H    = 88;    // canvas pixel height
const NAME_F   = "bold 15px system-ui, -apple-system, sans-serif";
const TAG_F    = "11px system-ui, -apple-system, sans-serif";
const TEXT_LH  = 22;    // line height passed to Pretext (layout baseline)

/**
 * Builds a THREE.CanvasTexture label for a tech ball using Pretext.
 *
 * Inline-flow simulation (no prepareInlineFlow needed):
 *   Each font "run" (name in bold, tag in light) is prepared separately.
 *   layoutWithLines() with a huge maxWidth prevents wrapping, so
 *   lines[0].width gives the exact pixel width of each segment.
 *   These widths drive precise positioning of the dot, name, and tag chip
 *   — plus the pill background that's sized exactly to the total content.
 */
function makeLabelTexture(name, tag, color) {
  const canvas  = document.createElement('canvas');
  canvas.width  = LBL_W;
  canvas.height = LBL_H;
  const ctx = canvas.getContext('2d');

  // ── Phase 1: prepare each text segment (Pretext's expensive phase — runs once per ball)
  const namePrepared = prepareWithSegments(name, NAME_F);
  const tagPrepared  = tag ? prepareWithSegments(tag, TAG_F) : null;

  // ── Phase 2: layout with huge maxWidth → no wrapping → lines[0].width = exact text width
  const nameW = layoutWithLines(namePrepared, 4000, TEXT_LH).lines[0]?.width ?? 0;
  const tagW  = tagPrepared
    ? layoutWithLines(tagPrepared, 4000, TEXT_LH).lines[0]?.width ?? 0
    : 0;

  // ── Geometry constants (pixels)
  const dotR      = 5;        // colored dot radius
  const dotGap    = 7;        // gap: dot → name
  const segGap    = 9;        // gap: name → tag chip
  const chipPadX  = 9;        // tag chip horizontal inner padding
  const chipPadY  = 3;        // tag chip vertical inner padding
  const pillPadX  = 14;       // pill outer horizontal padding
  const pillPadY  = 10;       // pill outer vertical padding

  const chipW     = tag ? tagW + chipPadX * 2 : 0;
  const chipH     = TEXT_LH - 4;
  const contentW  = dotR * 2 + dotGap + nameW + (tag ? segGap + chipW : 0);
  const pillW     = Math.min(contentW + pillPadX * 2, LBL_W - 8);
  const pillH     = TEXT_LH + pillPadY * 2;
  const pillX     = (LBL_W - pillW) / 2;
  const pillY     = (LBL_H - pillH) / 2;
  const pillR     = pillH / 2;

  // baseline: canvas 2D fillText uses the text baseline as y
  // position it within the pill's vertical center
  const baseline  = pillY + pillPadY + TEXT_LH * 0.76;
  let   curX      = pillX + pillPadX;

  // ── Draw: pill background
  ctx.fillStyle = 'rgba(6, 8, 16, 0.90)';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, pillR);
  ctx.fill();

  // ── Draw: pill border (tech color at low opacity)
  ctx.strokeStyle = color ? `${color}50` : 'rgba(255,255,255,0.18)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, pillR);
  ctx.stroke();

  // ── Draw: colored dot (tech accent)
  ctx.beginPath();
  ctx.arc(curX + dotR, baseline - dotR * 0.3, dotR, 0, Math.PI * 2);
  ctx.fillStyle = color || '#ffffff';
  ctx.fill();
  curX += dotR * 2 + dotGap;

  // ── Draw: tech name (bold)
  ctx.font      = NAME_F;
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(name, curX, baseline);
  curX += nameW + segGap;

  // ── Draw: tag chip (version / category)
  if (tag && tagPrepared) {
    const chipX = curX;
    const chipY = pillY + (pillH - chipH) / 2;

    // chip fill
    ctx.fillStyle = color ? `${color}22` : 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, chipW, chipH, chipH / 2);
    ctx.fill();

    // chip border
    ctx.strokeStyle = color ? `${color}55` : 'rgba(255,255,255,0.22)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, chipW, chipH, chipH / 2);
    ctx.stroke();

    // chip text — use Pretext-measured tagW to center precisely in the chip
    ctx.font      = TAG_F;
    ctx.fillStyle = color ? lighten(color, 0.3) : '#aaaaaa';
    // x: chipX + (chipW - tagW) / 2 centers the text using Pretext's exact measurement
    ctx.fillText(tag, chipX + (chipW - tagW) / 2, chipY + chipH * 0.72);
  }

  return new THREE.CanvasTexture(canvas);
}

/** Lightens a hex color string by mixing it toward white. ratio 0–1. */
function lighten(hex, ratio) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c) => Math.round(c + (255 - c) * ratio);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

// ─── Ball component ───────────────────────────────────────────────────────────
const Ball = ({ imgUrl, color, name, tag, noLabel }) => {
  const [decal] = useTexture([imgUrl]);

  // Label texture built once per [name, tag, color] — Pretext prepare() runs here
  const labelTexture = useMemo(
    () => makeLabelTexture(name, tag, color),
    [name, tag, color]
  );

  return (
    <>
      <Float speed={0.5} rotationIntensity={1} floatIntensity={2}>
        <mesh castShadow receiveShadow scale={2.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={color}
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          <Decal position={[0, 0, 1]}   rotation={[2 * Math.PI, 0, 6.25]}           scale={1} map={decal} flatShading />
          <Decal position={[0, 0, -1]}  rotation={[2 * Math.PI, Math.PI, 6.25]}     scale={1} map={decal} flatShading />
          <Decal position={[0, 1, 0]}   rotation={[Math.PI / 2, 0, 6.25]}           scale={1} map={decal} flatShading />
          <Decal position={[0, -1, 0]}  rotation={[-Math.PI / 2, 0, 6.25]}          scale={1} map={decal} flatShading />
          <Decal position={[1, 0, 0]}   rotation={[0, Math.PI / 2, 6.25]}           scale={1} map={decal} flatShading />
          <Decal position={[-1, 0, 0]}  rotation={[0, -Math.PI / 2, 6.25]}          scale={1} map={decal} flatShading />
        </mesh>
      </Float>

      {/*
        Label sprite lives OUTSIDE <Float> so it stays at a stable world position
        and isn't affected by Float's rotational oscillation.
        Sprites in Three.js always face the camera (billboard) automatically.

        Sprite scale = [LBL_W/LBL_H ratio × height, height, 1]
        LBL_W:LBL_H = 320:88 ≈ 3.636:1  →  [2.4, 0.66, 1]
      */}
      {!noLabel && (
        <sprite position={[0, -3.5, 0]} scale={[2.4, 0.66, 1]}>
          <spriteMaterial map={labelTexture} transparent depthWrite={false} />
        </sprite>
      )}
    </>
  );
};

// ─── BallCanvas ───────────────────────────────────────────────────────────────
const BallCanvas = ({ icon, ballColor, name, tag, noLabel }) => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      // Pull camera back slightly from default z=5 so the label below the ball
      // is fully within the frustum. FOV tightened for a crisper look.
      camera={{ position: [0, 0, 6.5], fov: noLabel ? 55 : 65 }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 0, 0.05]} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls autoRotate enableZoom={false} />
        <Ball imgUrl={icon} color={ballColor} name={name} tag={tag} noLabel={noLabel} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas
