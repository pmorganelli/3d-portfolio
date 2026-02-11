import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from './components';
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import { HeroScrollDemo } from "./components/ui/containerDemo";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative bg-primary">
        <StarsCanvas />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          {/* <ContainerScroll /> */}
          <About />
          <Experience />
          <Tech />
          <Works />
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App
