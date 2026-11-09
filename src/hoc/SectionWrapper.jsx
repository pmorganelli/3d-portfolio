import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
        <motion.section
          variants={staggerContainer()}
          initial="hidden"         // start hidden so whileInView has something to animate from
          whileInView="show"       // animate to “show” once the section scrolls into view
          // No `amount` threshold: a fraction of the section's own height can
          // exceed a phone's viewport (the stacked Projects grid is ~10 screens
          // tall), and then the section would never reveal at all.
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
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