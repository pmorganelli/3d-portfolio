import { Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from './components';

const App = () => {
  return (
    <div className="relative bg-primary">
      <StarsCanvas />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Experience />
        <Tech />
        <Works />
        <Contact />
      </div>
    </div>
  )
}
export default App
