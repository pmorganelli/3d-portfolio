import React from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { motion } from "framer-motion";
// import { githubicon } from "../assets";
// import { mail } from "../assets";
// import { linkedin } from "../assets";
import { textVariant, fadeIn } from "../utils/motion";

const Footer = () => {
  return (
    // <footer id="contact" >
    //   <div className={styles.sectionSubText}>
    //     <h2>Feel free to reach out!</h2>
    //     <p>Socials.</p>
    //   </div>
    //   <ul className={mail}>
    //     <li className={styles.sectionSubText}>
    //       {/* <Mail /> */}
    //       <a href="mailto:petercarlmorganelli@gmail.com">Email</a>
    //     </li>
    //     <li className={linkedin}>
    //       {/* <Linkedin /> */}
    //       <a href="https://www.linkedin.com/in/peter-morganelli-102860258/">LinkedIn</a>
    //     </li>
    //     <li className={githubicon}>
    //       <a href="https://github.com/pmorganelli">GitHub</a>
    //     </li>
    //   </ul>
    // </footer>

    <>
        <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Feel free to reach out!</p>
            <h2 className={styles.sectionHeadText}>Socials.</h2>
        </motion.div>
        <motion.div  variants={fadeIn("", "", 0.1, 1)}>

                    <a href="https://www.linkedin.com/in/peter-morganelli-102860258/">LinkedIn</a>


        </motion.div>
    
    </>
  );
};

export default SectionWrapper(Footer, "footer");
// export default Footer;