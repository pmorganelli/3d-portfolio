import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Decal, Float, OrbitControls, Preload, useTexture
} from '@react-three/drei'

import CanvasLoader from '../Loader'

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={0.5} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
      <Decal
        position={[0, 0, 1]}
        rotation={[2 * Math.PI, 0, 6.25]}
        scale={1}
        map={decal}
        flatShading
      />
      {/* Second Decal */}
      <Decal
        position={[0, 0, -1]}
        rotation={[2 * Math.PI, Math.PI, 6.25]}
        scale={1}
        map={decal}
        flatShading
      />
      {/* Third Decal */}
      <Decal
        position={[0, 1, 0]}
        rotation={[Math.PI / 2, 0, 6.25]}
        scale={1}
        map={decal}
        flatShading
      />
      {/* Fourth Decal */}
      <Decal
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 6.25]}
        scale={1}
        map={decal}
        flatShading
      />
      {/* Fifth Decal */}
      <Decal
        position={[1, 0, 0]}
        rotation={[0, Math.PI / 2, 6.25]}
        scale={1}
        map={decal}
        flatShading
      />
      <Decal
        position={[-1, 0, 0]}
        rotation={[0, -Math.PI / 2, 6.25]} // Adjusted rotation
        scale={1}
        map={decal}
        flatShading
      />
      </mesh>
    </Float>
  )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          autoRotate 
          enableZoom={false} 
          />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas