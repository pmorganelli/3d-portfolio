import { Suspense } from "react"
import { useReducedMotion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { MOUSE } from "three"
import CanvasLoader from '../Loader'

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf')

  return (
    <primitive
      object={earth.scene}
      scale={2.8}
      position-y={0}
      rotation-y={0}
    />
  )
}

// `active` is false while the globe is off screen. autoRotate is what keeps a
// demand-driven canvas rendering, so switching it off idles the GPU.
const EarthCanvas = ({ active = true }) => {
  const reducedMotion = useReducedMotion()
  return (
    <Canvas
      className="scroll-safe"
      frameloop="demand"
      onContextMenu={(event) => event.preventDefault()}
      camera={{
        fov: 55,
        near: 0.1,
        far: 200,
        position: [-4, 3, 7]
       }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate={active && !reducedMotion}
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
