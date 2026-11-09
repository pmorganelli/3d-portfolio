import { Suspense, lazy, useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { SectionWrapper } from "../hoc"
import TechProjectLinks from "./TechProjectLinks"
import { technologies } from "../constants"
import { motion, AnimatePresence } from "framer-motion"
import { styles } from "../styles"
import { textVariant } from "../utils/motion"

const SolarSystemCanvas = lazy(() => import("./canvas/SolarSystem"))
const TechBallGrid = lazy(() => import("./canvas/TechBallGrid"))

const MobileTechCard = ({ tech, onClose }) => {
  const borderColor = `${tech.color}44`
  const accentBg    = `${tech.color}18`

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ type: 'spring', damping: 24, stiffness: 240 }}
      className="fixed inset-x-4 bottom-6 z-50 rounded-2xl p-6 max-h-[58vh] overflow-y-auto"
      style={{
        background: 'rgb(10, 8, 28)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `1px solid ${borderColor}`,
      }}
    >
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-9 h-9 object-contain shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-white font-bold text-base leading-tight truncate">
              {tech.name}
            </h3>
            <p className="text-sm mt-0.5 truncate" style={{ color: tech.color }}>
              {tech.info.orbits}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                     text-white/70 hover:text-white hover:bg-white/10 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="mb-4">
        <span
          className="text-sm px-2.5 py-1 rounded-full border font-medium"
          style={{ color: tech.color, borderColor, background: accentBg }}
        >
          {tech.info.level}
        </span>
      </div>

      <p className="text-white/75 text-sm leading-relaxed mb-5">
        {tech.info.description}
      </p>

      {tech.info.projects.length > 0 && (
        <div>
          <p className="text-white/70 text-sm uppercase tracking-wide mb-2.5">
            Projects
          </p>
          <TechProjectLinks
            projects={tech.info.projects}
            color={tech.color}
            onNavigate={onClose}
          />
        </div>
      )}
    </motion.div>
  )
}

const Tech = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  )
  const [selectedTech, setSelectedTech] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => {
      setIsMobile(e.matches)
      if (!e.matches) setSelectedTech(null)
    }
    // Sync on mount — the innerWidth-based initial state can disagree with the
    // media query at fractional viewport widths (e.g. browser zoom)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Dismiss the card only when the tech section scrolls off the top of the viewport
  useEffect(() => {
    if (!selectedTech || !sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setSelectedTech(null)
        }
      },
      { threshold: 0 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [selectedTech])

  return (
    <div ref={sectionRef}>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>The Stack</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      {/* Both scenes are separate chunks: three.js stays out of the entry
          bundle, and each device only downloads the scene it shows */}
      {isMobile ? (
        // min-height matches the 4-row grid so nothing jumps when it loads
        <Suspense fallback={<div className="mt-8 h-[484px]" />}>
          <TechBallGrid technologies={technologies} onSelect={setSelectedTech} />
        </Suspense>
      ) : (
        <div className="w-full h-screen mt-6">
          <Suspense fallback={null}>
            <SolarSystemCanvas technologies={technologies} />
          </Suspense>
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {selectedTech && isMobile && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50"
                onClick={() => setSelectedTech(null)}
              />
              <MobileTechCard
                key={selectedTech.name}
                tech={selectedTech}
                onClose={() => setSelectedTech(null)}
              />
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

export default SectionWrapper(Tech, "tech")
