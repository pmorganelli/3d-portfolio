import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { useInView } from 'framer-motion'
import Ball from './Ball'

// Mobile tech grid. One shared WebGL context for the whole grid — a canvas per
// ball put the page at the browser's context limit and risked eviction.
const TechBallGrid = ({ technologies, onSelect }) => {
  const gridRef = useRef(null)
  // The canvas is a fixed full-viewport overlay, so it keeps drawing wherever
  // the page is scrolled. Stop the render loop while the grid is off screen.
  const inView = useInView(gridRef, { margin: '200px 0px' })

  return (
    <div className="relative mt-8">
      <div ref={gridRef} className="grid grid-cols-3 gap-3">
        {technologies.map((tech) => (
          <button
            type="button"
            key={tech.name}
            aria-label={`${tech.name} details`}
            className="relative h-28 cursor-pointer"
            onClick={() => onSelect(tech)}
          >
            <View className="pointer-events-none absolute inset-0">
              <ambientLight intensity={1.5} />
              <directionalLight position={[0, 0, 0.05]} />
              <Suspense fallback={null}>
                <Ball imgUrl={tech.icon} color={tech.color} />
              </Suspense>
            </View>
          </button>
        ))}
      </div>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 2]}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          pointerEvents: 'none',
          // With the loop stopped the last frame would stay painted at its old
          // screen position while the page scrolls underneath it
          visibility: inView ? 'visible' : 'hidden',
        }}
      >
        <View.Port />
      </Canvas>
    </div>
  )
}

export default TechBallGrid
