import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Tilt } from 'react-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

// ── Reusable UIverse-style glow button ───────────────────────────────────────
const GlowButton = ({ children, onClick, href, target, rel }) => {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} target={target} rel={rel} onClick={onClick} className="glow-btn">
      <div className="glow-blob1" />
      <div className="glow-blob2" />
      <div className="glow-inner">{children}</div>
    </Tag>
  );
};

// ── Learn More modal ──────────────────────────────────────────────────────────
const LearnMoreModal = ({ project, onClose }) =>
  createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="flex min-h-full items-start justify-center px-4 py-8">
        <motion.div
          className="relative z-10 bg-[#0d0b1f] rounded-2xl w-full max-w-2xl
                     shadow-2xl border border-white/10 flex flex-col"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero image — close button sits on top of it */}
          <div className="relative w-full aspect-video shrink-0 overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-top"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center
                         justify-center bg-black/60 text-white/70 hover:text-white
                         hover:bg-black/80 transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-7 flex flex-col gap-6">
            {/* Title + tags */}
            <div>
              <h2 className="text-white font-bold text-[22px] leading-snug">
                {project.name}
              </h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span
                    key={`${tag.name}-${i}`}
                    className={`text-[12px] font-medium ${tag.color}`}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>

            <Section title="Overview">
              <p className="text-secondary text-[15px] leading-relaxed">
                {project.details.overview}
              </p>
            </Section>

            <Section title="My Role">
              <p className="text-secondary text-[15px] leading-relaxed">
                {project.details.role}
              </p>
            </Section>

            <Section title="How It Was Built">
              <ul className="flex flex-col gap-2">
                {project.details.built.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-secondary text-[15px] leading-relaxed">
                    <span className="text-blue-400 shrink-0 mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Highlights">
              <ul className="flex flex-col gap-2">
                {project.details.highlights.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-secondary text-[15px] leading-relaxed">
                    <span className="text-violet-400 shrink-0 mt-0.5">★</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <div className="flex gap-3 pt-1 items-center">
              {!project.inProgress && !project.noDemo && (
                <GlowButton
                  href={project.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </GlowButton>
              )}
              {!project.privateRepo && (
                <a
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl text-center text-[13px] font-semibold
                             border border-white/15 text-white/70 hover:text-white
                             hover:border-white/30 transition-colors"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );

// Small reusable section block inside the modal
const Section = ({ title, children }) => (
  <div>
    <h4 className="text-white font-semibold text-[13px] uppercase tracking-widest mb-2.5
                   text-white/40">
      {title}
    </h4>
    {children}
  </div>
);

// ── In-progress modal ─────────────────────────────────────────────────────────
const InProgressModal = ({ project, onClose }) =>
  createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="flex min-h-full items-start justify-center px-4 py-8">
        <motion.div
          className="relative z-10 bg-tertiary rounded-2xl w-full max-w-md
                     shadow-2xl border border-white/10 flex flex-col"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero image — close button sits on top of it */}
          <div className="relative w-full h-[180px] shrink-0 overflow-hidden rounded-t-2xl">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center
                         justify-center bg-black/60 text-white/70 hover:text-white
                         hover:bg-black/80 transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="p-7 flex flex-col gap-4">
            <h3 className="text-white font-bold text-[22px]">{project.name}</h3>

            <div className="flex flex-col items-center gap-3 py-4">
              <span className="text-4xl">🚧</span>
              <p className="text-white font-semibold text-[18px] text-center">In progress!</p>
              <p className="text-secondary text-[15px] text-center leading-relaxed">
                Source code and demo available soon :)
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {project.tags.map((tag, i) => (
                <p key={`${tag.name}-${i}`} className={`text-[13px] ${tag.color}`}>
                  {tag.name}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );

// ── Project card ──────────────────────────────────────────────────────────────
const ProjectCard = ({ index, name, description, tags, image, source_code_link, demo_link, inProgress, privateRepo, onInProgressClick, onLearnMore }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className="w-full sm:w-[360px]"
  >
    <Tilt
      options={{ max: 45, scale: 1, speed: 450, gyroscope: false }}
      className="bg-tertiary p-5 rounded-2xl h-full"
    >
      <div className="relative w-full h-[230px]">
        {inProgress ? (
          <button
            onClick={onInProgressClick}
            className="block w-full h-full rounded-2xl overflow-hidden"
          >
            <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
            <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/40">
              <span className="bg-yellow-500/90 text-black font-bold text-[13px] px-3 py-1 rounded-full tracking-wide">
                IN PROGRESS
              </span>
            </div>
          </button>
        ) : (
          <a href={demo_link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
          </a>
        )}

        {/* GitHub — top left (hidden for private repos) */}
        {!privateRepo && (
          <div className="absolute top-0 left-0 z-10">
            <button
              onClick={() => window.open(source_code_link, '_blank')}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
            >
              <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
            </button>
          </div>
        )}

        {/* Learn More — top right */}
        <div className="absolute top-0 right-0 z-10">
          <GlowButton onClick={onLearnMore}>Learn More</GlowButton>
        </div>
      </div>

      <div className="mt-5">
        <h3
          className="text-white font-bold text-[24px] cursor-pointer"
          onClick={inProgress ? onInProgressClick : () => window.open(demo_link, '_blank')}
        >
          {name}
        </h3>
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, tagIndex) => (
          <p key={`${tag.name}-${tagIndex}`} className={`text-[14px] ${tag.color}`}>
            {tag.name}
          </p>
        ))}
      </div>
    </Tilt>
  </motion.div>
);

// ── Section content ───────────────────────────────────────────────────────────
const WorksContent = () => {
  const [activeInProgress, setActiveInProgress] = useState(null);
  const [activeLearnMore, setActiveLearnMore]   = useState(null);

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>My work.</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </div>

      <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
        The following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. These examples reflect my ability to solve complex problems, work with various technologies, and manage projects effectively. Please reach out to me using the contact form with any questions!
      </p>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            index={index}
            {...project}
            onInProgressClick={() => setActiveInProgress(project)}
            onLearnMore={() => setActiveLearnMore(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeInProgress && (
          <InProgressModal
            key={activeInProgress.name}
            project={activeInProgress}
            onClose={() => setActiveInProgress(null)}
          />
        )}
        {activeLearnMore && (
          <LearnMoreModal
            key={`learn-${activeLearnMore.name}`}
            project={activeLearnMore}
            onClose={() => setActiveLearnMore(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Works = SectionWrapper(WorksContent, 'projects');
export default Works;
