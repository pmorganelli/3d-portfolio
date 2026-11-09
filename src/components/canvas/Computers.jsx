import { Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
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
      />
    </Center>
  );
};

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

  return (
    <div ref={wrapRef} className="w-full h-full">
    <Canvas
      frameloop={inView ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: isMobile ? 52 : 46, near: 0.1, far: 100 }}
      gl={{ antialias: true }}
      className="scroll-safe"
      style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
    >
      <AdaptiveDpr />
      <AdaptiveEvents />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.2}
      />
      <hemisphereLight intensity={0.25} groundColor={"#222"} />

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.9}
          autoRotate
          autoRotateSpeed={0.6}
          minPolarAngle={0.05}
          maxPolarAngle={Math.PI - 0.05}
          target={[0, 0, 0]}
        />

        <Bounds fit clip observe margin={1.15}>
          <RubiksCube />
        </Bounds>

        <Preload all />
      </Suspense>
    </Canvas>
    </div>
  );
};

export default ComputersCanvas;

useGLTF.preload("/rubiks_cube/scene.gltf");
