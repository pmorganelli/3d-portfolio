import { SolarSystemCanvas } from "./canvas"
import { SectionWrapper } from "../hoc"
import { technologies } from "../constants"
import { motion } from "framer-motion"

import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>The Stack</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      {/* Full-width solar system — drag to orbit, click any planet to inspect */}
      <div className="w-full h-screen mt-6">
        <SolarSystemCanvas technologies={technologies} />
      </div>
    </div>
  )
}

export default SectionWrapper(Tech, "tech");