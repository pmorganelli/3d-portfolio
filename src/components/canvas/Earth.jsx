import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { MOUSE } from "three"
import CanvasLoader from '../Loader'

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf')

  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}

    />
  )
}

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      onContextMenu={(event) => event.preventDefault()}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 55,
        near: 0.1,
        far: 200,
        position: [-4, 3, 7]
       }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          mouseButtons={{
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.DOLLY,
          }}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas
