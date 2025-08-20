import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Bounds,
  Center,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const RubiksCube = () => {
  const { scene } = useGLTF("/rubiks_cube/scene.gltf");

  return (
    <Center>
      <primitive
        object={scene}
        rotation={[-0.1, -0.3, -0.05]}
        castShadow
        receiveShadow
      />
    </Center>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      // bigger = FOV subject looks smaller in frame
      camera={{ position: [0, 0, 6], fov: isMobile ? 52 : 46, near: 0.1, far: 100 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    >
      <AdaptiveDpr />
      <AdaptiveEvents />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight intensity={0.25} groundColor={"#222"} />

      <Suspense fallback={<CanvasLoader />}>
        {/* Full 360° horizontal rotation restored; almost full vertical */}
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.9}
          // allow full azimuth (no left/right constraint)
          // keep polar nearly full range to avoid flipping through the poles
          minPolarAngle={0.05}
          maxPolarAngle={Math.PI - 0.05}
          target={[0, 0, 0]}
        />

        {/* Auto-fit keeps size in check on all screens */}
        <Bounds fit clip observe margin={1.15}>
          <RubiksCube />
        </Bounds>

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;

// Preload for snappier first paint
useGLTF.preload("/rubiks_cube/scene.gltf");
