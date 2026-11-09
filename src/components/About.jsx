import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "tween", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I&apos;m a computer science student at Tufts and a software engineer
        who likes systems work, teaching, and building things people actually
        use. Most recently I interned at MITRE on a GraphRAG platform. At Tufts
        I&apos;m on the Data Structures course staff and help run a student
        pizzeria whose ordering system I built.
      </motion.p>
    </>
  );
};

export default SectionWrapper(About, "about");
