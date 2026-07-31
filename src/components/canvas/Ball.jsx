import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Decal, Float, useTexture } from '@react-three/drei'

// Radians per second. Matches the solar system planets (0.008/frame at 60fps),
// so a ball completes a revolution in ~13s. Delta-scaled so the speed is the
// same on 60Hz and 120Hz displays.
const SPIN_SPEED = 0.5;

// Bare ball mesh — rendered inside a shared <Canvas> via drei <View> (see Tech.jsx).
// Per-ball canvases were replaced with one context: 11 simultaneous WebGL
// contexts put the page at the browser's context limit on mobile.
const Ball = ({ imgUrl, color }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef();

  // Float alone does NOT spin — it assigns rotation to a sine, so it's a bounded
  // wobble of ±(rotationIntensity/8) rad ≈ ±7°, which reads as motionless on a
  // sphere with six identical decals. The actual spin has to accumulate here.
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += SPIN_SPEED * delta;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={2}>
      <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
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
  );
};

export default Ball
