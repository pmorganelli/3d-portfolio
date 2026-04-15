import React, { useState } from 'react';
import { Tilt } from 'react-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

// Modal shown for in-progress projects
const InProgressModal = ({ project, onClose }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative z-10 bg-tertiary rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/10"
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-white transition-colors text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Project image */}
        <div className="w-full h-[180px] rounded-xl overflow-hidden mb-6">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Heading */}
        <h3 className="text-white font-bold text-[22px] mb-2">{project.name}</h3>

        {/* In-progress message */}
        <div className="mt-4 flex flex-col items-center gap-3 py-4">
          <span className="text-4xl">🚧</span>
          <p className="text-white font-semibold text-[18px] text-center">In progress!</p>
          <p className="text-secondary text-[15px] text-center leading-relaxed">
            Source code and demo available soon :)
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {project.tags.map((tag, i) => (
            <p key={`${tag.name}-${i}`} className={`text-[13px] ${tag.color}`}>
              {tag.name}
            </p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// Single project card with tilt and animation
const ProjectCard = ({ index, name, description, tags, image, source_code_link, demo_link, inProgress, onInProgressClick }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className="w-full sm:w-[360px]"
  >
    <Tilt
      options={{ max: 45, scale: 1, speed: 450, gyroscope: false }}
      className="bg-tertiary p-5 rounded-2xl h-full"
    >
      <div className="relative w-full h-[230px]">
        {/* Demo image link */}
        {inProgress ? (
          <button
            onClick={onInProgressClick}
            className="block w-full h-full rounded-2xl overflow-hidden"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* In-progress badge overlay */}
            <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/40">
              <span className="bg-yellow-500/90 text-black font-bold text-[13px] px-3 py-1 rounded-full tracking-wide">
                IN PROGRESS
              </span>
            </div>
          </button>
        ) : (
          <a
            href={demo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </a>
        )}

        {/* GitHub icon */}
        <div className="absolute top-0 left-0 z-60">
          <button
            onClick={() => window.open(source_code_link, '_blank')}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
          >
            <img
              src={github}
              alt="github"
              className="w-1/2 h-1/2 object-contain"
            />
          </button>
        </div>
      </div>

      {/* Title & description */}
      <div className="mt-5">
        <h3
          className="text-white font-bold text-[24px] cursor-pointer"
          onClick={inProgress ? onInProgressClick : () => window.open(demo_link, '_blank')}
        >
          {name}
        </h3>
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
      </div>

      {/* Tags */}
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

// Plain, static version for mobile (no HOC/motion)
const WorksPlain = () => {
  const [activeInProgress, setActiveInProgress] = useState(null);

  return (
    <section className={`${styles.padding} max-w-7xl mx-auto`}>
      <div>
        <p className={styles.sectionSubText}>My work.</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </div>

      <p className="z-40 mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
        The following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. These examples reflect my ability to solve complex problems, work with various technologies, and manage projects effectively. Please reach out to me using the contact form with any questions!
      </p>

      <div className="z-40 mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            onInProgressClick={() => setActiveInProgress(project)}
          />
        ))}
      </div>

      {activeInProgress && (
        <InProgressModal
          project={activeInProgress}
          onClose={() => setActiveInProgress(null)}
        />
      )}
    </section>
  );
};

// Animated version wrapped with HOC for tablet+ screens (anchor lives at Works level)
const WorksAnimated = SectionWrapper(WorksPlain, '');

// Main component choosing static vs animated by breakpoint
const Works = () => (
  <div className="relative">
    {/* Scroll anchor: absolutely positioned so it takes no visual space.
        top: -100px offsets the fixed navbar height. */}
    <span id="projects" className="absolute" style={{ top: '-100px' }} />

    {/* Mobile: static plain version */}
    <div className="block sm:hidden">
      <WorksPlain />
    </div>

    {/* Tablet+ : animated version */}
    <div className="hidden sm:block">
      <WorksAnimated />
    </div>
  </div>
);

export default Works;
