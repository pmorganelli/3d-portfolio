import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative bg-primary">
        <StarsCanvas />
        <div className="relative z-10">
          <Navbar />
          <Hero />
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
