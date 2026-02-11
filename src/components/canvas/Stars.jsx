import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.esm"

const StarLayer = ({ count, radius, size, color, speed = 1 }) => {
  const ref = useRef()
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(count), { radius }),
    [count, radius]
  )

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.03 * speed
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.1
    ref.current.rotation.z = Math.PI / 4 + Math.cos(t * 0.16) * 0.05
  })

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled>
      <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
    </Points>
  )
}

const Stars = () => (
  <group>
    <StarLayer
      count={3600}
      radius={2.1}
      size={0.0024}
      color="#f19dd9"
      speed={1}
    />
    <StarLayer
      count={2400}
      radius={2.6}
      size={0.0019}
      color="#ffd5ef"
      speed={0.8}
    />
  </group>
)

const StarsCanvas = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1.9] }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.25}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}
export default StarsCanvas
