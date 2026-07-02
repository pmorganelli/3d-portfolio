import { Decal, Float, useTexture } from '@react-three/drei'

// Bare ball mesh — rendered inside a shared <Canvas> via drei <View> (see Tech.jsx).
// Per-ball canvases were replaced with one context: 11 simultaneous WebGL
// contexts put the page at the browser's context limit on mobile.
const Ball = ({ imgUrl, color }) => {
  const [decal] = useTexture([imgUrl]);

  return (
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
  );
};

export default Ball
