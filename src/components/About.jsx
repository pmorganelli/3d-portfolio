import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ElectricBorder from "./ui/ElectricBorder";

const ServiceCard = ({ index, title, icon, desc }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full rounded-[20px] shadow-card'
    >
      <ElectricBorder
        color='#9b80ff'
        speed={1}
        chaos={0.12}
        thickness={2}
        borderRadius={20}
        style={{ borderRadius: 20 }}
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img
            src={icon}
            alt='web-development'
            className='w-16 h-16 object-contain'
          />

          <h3 className='text-[20px] font-bold text-center bg-clip-text text-transparent bg-white  via-red-500 to-violet-600'>
            {title}
          </h3>
          <h1 className='text-semibold text-[13px] text-white text-center'>
            {desc}
          </h1>
        </div>
      </ElectricBorder>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a skilled software developer with experience working in teams
        rooted in strong communication and collaboration. I'm a quick learner 
        who enjoys complicated problems and interesting conversations.
        Let's connect!
      </motion.p>
      

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
