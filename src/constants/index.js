import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    git,
    figma,
    dcr,
    jumbocode,
    jumbocodedark,
    tufts,
    breakmatcher,
    rpn,
    portfolio,
    theatre,
    threejs,
    basic,
    cplusplus,
    mit,
    github,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
    {
      id: "public/resume.pdf",
      title: "Résumé",
    }
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
      desc: "I've constructed multiple sites with complex front-end frameworks",
    },
    {
      title: "UI + UX Designer",
      icon: mobile,
      desc: "I'm passionate about optimizing the user experience for every site that I work on",
    },
    {
      title: "Fullstack Developer",
      icon: backend,
      desc: "I've contributed to large-scale projects with complex backend servers",
    },
    {
      title: "College Student",
      icon: creator,
      desc: "I'm a full-time student at Tufts University concentrating in computer science",
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "C++",
      icon: cplusplus,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
  ];
  
  const experiences = [
    {
      title: "Pool Lifeguard",
      company_name: "Department of Conservation and Recreation",
      icon: dcr,
      iconBg: "#383E56",
      date: "June - August 2022, 2023, and 2024",
      points: [
        "Rescued seven children in the water",
        "Responded to all emergencies and ensured proper cleanliness of the facility while enforcing pool rules and scanning zones in the water",
      ],
    },
    {
      title: "Project Mentor",
      company_name: "Massachusetts Institute of Technology's Leadership Training Institute (MIT LTI)",
      icon: mit,
      iconBg: "#383E56",
      date: "February 2024 - May 2024",
      points: [
        "Mentored a full classroom of students on community service projects, including one student who was chosen to present out of 50+ peers",
        "Accomplished through leading weekly two-hour in-person development sessions at MIT",
        "Currently in the process of founding LTI at Tufts!",
      ],
    },
    {
      title: "Software Developer",
      company_name: "Tufts JumboCode",
      icon: jumbocode,
      iconBg: "#E6DEDD",
      date: "October 2023 - Present",
      points: [
        "Helped develop a full-stack inventory website for a local Somerville theater with a group of 10 developers",
        "Contributed through weekly GitHub tickets assigned by lead developers (Liam Strand and Amitav Nott)",
        "Constructed GET and POST API handlers in TypeScript, created and fixed several React components, and styled them with Tailwind CSS",
        "Designed a page to allow the user to take a picture of an item and post their product’s name, description, filters, and custom image carousel",
        "JumboHack Hackathon Participant",
      ],
    },
    {
      title: "Data Structures TA",
      company_name: "Tufts University",
      icon: tufts,
      iconBg: "#383E56",
      date: "September 2024 - Present",
      points: [
        "Held regular office hours to support students with homework assignments and course concepts",
        "Evaluated and graded student submissions, assessing code functionality, style, and organization",
        "Provided constructive feedback to students, facilitating their understanding and application of data structures principles",
      ],
    },
  ];
    
  const projects = [
    {
      name: "College Break Matcher",
      description:
        "Select two colleges. See their overlapping breaks. Currently in progress!",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "typescript",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
        {
          name: "python",
          color: "blue-text-gradient",
        },
        {
          name: "flask",
          color: "green-text-gradient",
        },
        {
          name: "beautifulsoup",
          color: "orange-text-gradient",
        },
        {
          name: "next",
          color: "blue-text-gradient",
        },
      ],
      image: breakmatcher,
      source_code_link: "https://github.com/jpizzzel/academic-calendar",
      demo_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      name: "Theatre@First",
      description:
        "Inventory application for a local Somerville theater. Contributed alongside a team of 10 developers.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "typescript",
          color: "green-text-gradient",
        },
        {
          name: "next",
          color: "pink-text-gradient",
        },
        {
          name: "next",
          color: "blue-text-gradient",
        },
        {
          name: "tailwind",
          color: "green-text-gradient",
        },
        {
          name: "drizzleorm",
          color: "orange-text-gradient",
        },
      ],

      //React.js, Clerk, TypeScript, Next.js, TailwindCSS, DrizzleORM, GitHub, Slack, Figma 
      image: theatre,
      source_code_link: "https://github.com/JumboCode/theatre-at-first",
      demo_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    },
    {
      name: "Basic Portfolio Website",
      description:
        "Developed a responsive portfolio website, demonstrating strong front-end web development skills and modern web design principles",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "html",
          color: "pink-text-gradient",
        },
        {
          name: "css",
          color: "blue-text-gradient",
        },
        {
          name: "vite",
          color: "green-text-gradient",
        },

      ],
      image: basic,
      source_code_link: "https://github.com/pmorganelli/portfolio-website",
      demo_link: "https://basicpetermorganelli.vercel.app/",
    },
    {
      name: "gerp",
      description:
        "Replicated the Unix “grep” program using C++, Hash Tables, and Vectors. Made with a partner for a Data Structures class. Source and demo unavailable... ;)",
      tags: [
        {
          name: "c++",
          color: "blue-text-gradient",
        },
        {
          name: "data structures",
          color: "green-text-gradient",
        },

      ],
      image: portfolio,
      source_code_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      name: "CalcYouLater",
      description:
        "A postfix notation calculator that can handle complex arithmetic and string parsing. Source and demo unavailable... ;)",
      tags: [
        {
          name: "c++",
          color: "blue-text-gradient",
        },
        {
          name: "data structures",
          color: "green-text-gradient",
        },
      ],
      image: rpn,
      source_code_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];
  
  export { services, technologies, experiences, projects };