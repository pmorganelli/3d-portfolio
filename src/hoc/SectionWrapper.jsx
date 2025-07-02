import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
        <motion.section
          variants={staggerContainer()}
          initial={false}          // don’t apply the “hidden” styles on mount
          whileInView="show"       // still animate to “show” on scroll
          viewport={{ once: true, amount: 0.1 }}
          className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        >

        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;