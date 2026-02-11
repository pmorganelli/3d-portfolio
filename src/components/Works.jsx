import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

// Single project card with tilt and animation
const ProjectCard = ({ index, name, description, tags, image, source_code_link, demo_link }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className="w-full sm:w-[360px]"
  >
    <Tilt
      options={{ max: 45, scale: 1, speed: 450, gyroscope: false }}
      className="relative z-50 bg-tertiary p-5 rounded-2xl h-full"
    >
      <div className="relative w-full h-[230px]">
        {/* Demo image link */}
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
          onClick={() => window.open(demo_link, '_blank')}
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
const WorksPlain = () => (
  <section id="projects" className={`${styles.padding} max-w-7xl mx-auto`}>
    <div>
      <p className={styles.sectionSubText}>My work.</p>
      <h2 className={styles.sectionHeadText}>Projects.</h2>
    </div>

    <p className="z-40 mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
      The following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. These examples reflect my ability to solve complex problems, work with various technologies, and manage projects effectively. Please reach out to me using the contact form with any questions!
    </p>

    {/* Embedded live demo iframe
    <div className="z-40 mt-8 w-full">
      <h3 className="text-white font-bold text-[20px] mb-3">Live Embed</h3>
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          src="https://jumbdletest.vercel.app/"
          title="Jumbled Test"
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div> */}

    <div className="z-40 mt-20 flex flex-wrap gap-7">
      {projects.map((project, index) => (
        <ProjectCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>
  </section>
);

// Animated version wrapped with HOC for tablet+ screens
const WorksAnimated = SectionWrapper(WorksPlain, 'projects');

// Main component choosing static vs animated by breakpoint
const Works = () => (
  <>
    {/* Mobile: static plain version */}
    <div className="block sm:hidden">
      <WorksPlain />
    </div>

    {/* Tablet+ : animated version */}
    <div className="hidden sm:block">
      <WorksAnimated />
    </div>
  </>
);

export default SectionWrapper(Works, "projects");
