import { Suspense, lazy } from 'react';
import { MotionConfig } from 'framer-motion';
import { Contact, Experience, Hero, Navbar, Tech, Works } from './components';

// three.js is ~1 MB; keep it out of the entry bundle so text renders first
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));

const App = () => {
  return (
    // reducedMotion="user": with the OS "reduce motion" setting on, framer drops
    // transform animations (slides, the scroll cue bounce) and keeps fades
    <MotionConfig reducedMotion="user">
    <div className="relative bg-primary">
      <Suspense fallback={null}>
        <StarsCanvas />
      </Suspense>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Experience />
        <Tech />
        <Works />
        <Contact />
      </div>
    </div>
    </MotionConfig>
  )
}
export default App
