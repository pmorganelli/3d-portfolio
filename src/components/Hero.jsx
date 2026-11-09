import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto flex flex-col">
      <div className={`${styles.paddingX} mx-auto max-w-7xl pt-[120px]`}>
        {/* Responsive 2-col layout on large screens; stack on small */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text column */}
          <div className="relative z-10">
            {/* items-stretch + flex-1 so the accent line grows with the text
                instead of stopping short when the copy wraps on narrow phones */}
            <div className="flex items-stretch gap-5">
              <div className="flex flex-col items-center mt-2">
                <div className="w-5 h-5 shrink-0 rounded-full bg-gradient-to-t from-blue-300 to-blue-800" />
                <div className="w-1 flex-1 sm:min-h-80 min-h-40 bg-gradient-to-b from-blue-300 to-blue-800" />
              </div>

              <div>
                <h1 className={`${styles.heroHeadText} text-white`}>
                  Hi, I&apos;m{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-800">
                    Peter
                  </span>
                </h1>
                <p className={`${styles.heroSubText}`}>
                  I&apos;m a software engineer and computer science student at
                  <br className="sm:block hidden" /> Tufts University. Please reach
                  out if you&apos;d like to connect!
                </p>
              </div>
            </div>
          </div>

          {/* 3D column */}
          <div className="relative w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[500px] xl:h-[560px]">
            <ComputersCanvas />
          </div>
        </div>
      </div>

      {/* Scroll cue — in normal flow (pushed down by mt-auto) so on short
          phones it lands below the cube instead of being drawn on top of it */}
      <div className="mt-auto pt-6 xs:pb-5 pb-24 w-full flex justify-center items-center">
        <a href="#work" aria-label="Scroll to experience">
          <div className="w-[35px] h-[60px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
