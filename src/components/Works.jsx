import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Tilt } from 'react-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn } from '../utils/motion';

// Insert a zero-width space after "/" so names like "Compressor/Decompressor"
// wrap cleanly at the slash instead of mid-word
const breakAtSlash = (name) => name.replace(/\//g, '/\u200b');

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

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

const LearnMoreModal = ({ project, onClose }) => {
  const panelRef = useRef(null);

  // Keep Tab inside the dialog — without this, tabbing walks straight into the
  // page content sitting behind the overlay. Focus is restored on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const panel = panelRef.current;
    panel?.focus();

    const onKeyDown = (e) => {
      if (e.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null
      );
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  const hasDemo = !project.noDemo;
  const hasSource = !project.privateRepo;

  return createPortal(
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
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
          tabIndex={-1}
          className="relative z-10 bg-[#0d0b1f] rounded-2xl w-full max-w-2xl
                     shadow-2xl border border-white/10 flex flex-col outline-none"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
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

          <div className="p-7 flex flex-col gap-6">
            <div>
              <h2 className="text-white font-bold text-[22px] leading-snug break-words">
                {breakAtSlash(project.name)}
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

            {/* Projects that are both private and demo-less would otherwise
                leave an empty padded row at the bottom of the modal */}
            {(hasDemo || hasSource) && (
              <div className="flex gap-3 pt-1 items-center">
                {hasDemo && (
                  <GlowButton
                    href={project.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </GlowButton>
                )}
                {hasSource && (
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
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
};

const Section = ({ title, children }) => (
  <div>
    <h4 className="text-white/70 font-semibold text-[14px] uppercase tracking-wide mb-2.5">
      {title}
    </h4>
    {children}
  </div>
);

const ProjectCard = ({ index, name, description, tags, image, source_code_link, demo_link, privateRepo, noDemo, onLearnMore }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className="w-full"
  >
    <Tilt
      options={{ max: 45, scale: 1, speed: 450, gyroscope: false }}
      className="bg-tertiary p-5 rounded-2xl h-full"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl">
        {!noDemo && demo_link ? (
          <a href={demo_link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
          </a>
        ) : (
          <div className="block w-full h-full">
            <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
          </div>
        )}

        {!privateRepo && (
          <div className="absolute top-0 left-0 z-10">
            <button
              onClick={() => window.open(source_code_link, '_blank', 'noopener,noreferrer')}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
            >
              <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
            </button>
          </div>
        )}

        <div className="absolute top-0 right-0 z-10">
          <GlowButton onClick={onLearnMore}>Learn More</GlowButton>
        </div>
      </div>

      <div className="mt-5">
        <h3
          className={`text-white font-bold text-[24px] break-words ${(!noDemo && demo_link) ? 'cursor-pointer' : ''}`}
          onClick={(!noDemo && demo_link) ? () => window.open(demo_link, '_blank', 'noopener,noreferrer') : undefined}
        >
          {breakAtSlash(name)}
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

const WorksContent = () => {
  const [activeLearnMore, setActiveLearnMore] = useState(null);

  useEffect(() => {
    if (!activeLearnMore) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLearnMore(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // Lock background scroll while the modal is open. index.css puts
    // `overflow-x: hidden` on <html>, which makes <html> the scrolling element
    // and stops body-overflow from propagating — so lock both. Compensate for
    // the removed scrollbar so the page underneath doesn't shift sideways.
    const root = document.documentElement;
    const { body } = document;
    const prevRootOverflow = root.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      root.style.overflow = prevRootOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [activeLearnMore]);

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>My work.</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </div>

      <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
        Selected projects from coursework, hackathons, teaching tools, and team builds. I highlight the implementation details, collaboration context, and tradeoffs behind each one so the work speaks beyond the screenshots.
      </p>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 mx-auto max-w-[360px] sm:max-w-[748px] xl:max-w-[1136px]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            index={index}
            {...project}
            onLearnMore={() => setActiveLearnMore(project)}
          />
        ))}
      </div>

      <AnimatePresence>
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
