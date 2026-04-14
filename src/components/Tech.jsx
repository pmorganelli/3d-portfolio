import { useState, useEffect } from "react"
import { SolarSystemCanvas, BallCanvas } from "./canvas"
import { SectionWrapper } from "../hoc"
import { technologies } from "../constants"
import { motion, AnimatePresence } from "framer-motion"
import { styles } from "../styles"
import { textVariant } from "../utils/motion"

// ── Mobile tech card (bottom sheet) ──────────────────────────────────────────
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
        background: 'rgba(10, 8, 28, 0.97)',
        backdropFilter: 'blur(14px)',
        border: `1px solid ${borderColor}`,
      }}
    >
      {/* Header */}
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
            <p className="text-xs mt-0.5 truncate" style={{ color: tech.color }}>
              {tech.info.orbits}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                     text-white/40 hover:text-white hover:bg-white/10 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Level badge */}
      <div className="mb-4">
        <span
          className="text-xs px-2.5 py-1 rounded-full border font-medium"
          style={{ color: tech.color, borderColor, background: accentBg }}
        >
          {tech.info.level}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/65 text-sm leading-relaxed mb-5">
        {tech.info.description}
      </p>

      {/* Projects */}
      {tech.info.projects.length > 0 && (
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2.5">
            Projects
          </p>
          <div className="flex flex-col gap-2">
            {tech.info.projects.map(p => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
              >
                <span className="text-sm" style={{ color: tech.color }}>→</span>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ── Tech section ──────────────────────────────────────────────────────────────
const Tech = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  )
  const [selectedTech, setSelectedTech] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => {
      setIsMobile(e.matches)
      if (!e.matches) setSelectedTech(null)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>The Stack</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      {isMobile ? (
        /* ── Mobile: 3-column grid of 3D balls, tap to inspect ── */
        <div className="mt-8 grid grid-cols-3 gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="relative h-28 cursor-pointer"
              onClick={() => setSelectedTech(tech)}
            >
              <BallCanvas
                icon={tech.icon}
                ballColor={tech.color}
                name={tech.name}
                tag={tech.tag}
                noLabel
              />
              {/* Transparent overlay captures the tap without blocking WebGL render */}
              <div className="absolute inset-0" />
            </div>
          ))}
        </div>
      ) : (
        /* ── Desktop: full solar system ── */
        <div className="w-full h-screen mt-6">
          <SolarSystemCanvas technologies={technologies} />
        </div>
      )}

      {/* Mobile TechCard overlay */}
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
      </AnimatePresence>
    </div>
  )
}

export default SectionWrapper(Tech, "tech")
