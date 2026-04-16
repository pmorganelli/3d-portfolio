import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei'

import CanvasLoader from '../Loader'
import { makeLabelTexture, LBL_W, LBL_H } from './labelTexture'

// ─── Ball component ───────────────────────────────────────────────────────────
const Ball = ({ imgUrl, color, name, tag, noLabel }) => {
  const [decal] = useTexture([imgUrl]);

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
          <Decal position={[0,  0,  1]} rotation={[2 * Math.PI, 0,           6.25]} scale={1} map={decal} flatShading />
          <Decal position={[0,  0, -1]} rotation={[2 * Math.PI, Math.PI,     6.25]} scale={1} map={decal} flatShading />
          <Decal position={[0,  1,  0]} rotation={[Math.PI / 2,  0,          6.25]} scale={1} map={decal} flatShading />
          <Decal position={[0, -1,  0]} rotation={[-Math.PI / 2, 0,          6.25]} scale={1} map={decal} flatShading />
          <Decal position={[ 1, 0,  0]} rotation={[0,  Math.PI / 2,          6.25]} scale={1} map={decal} flatShading />
          <Decal position={[-1, 0,  0]} rotation={[0, -Math.PI / 2,          6.25]} scale={1} map={decal} flatShading />
        </mesh>
      </Float>

      {/* Label sprite lives OUTSIDE <Float> — stays at a stable world position,
          unaffected by Float's rotational oscillation. */}
      {!noLabel && (
        <sprite position={[0, -3.5, 0]} scale={[LBL_W / LBL_H * 0.66, 0.66, 1]}>
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
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
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
