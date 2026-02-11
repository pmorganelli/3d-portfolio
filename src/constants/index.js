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
    ltiLogo,
    rpn,
    portfolio,
    theatre,
    threejs,
    basic,
    cplusplus,
    flow,
    mit,
    codeclock,
    c,
    launch,
    snowplowdriver,
    csharp,
    slingshotSquire,
    smCapture,
    interpHomePage,
    mitre
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Experience",
    },
    {
      id: "projects",
      title: "Projects",
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
      title: "UI + UX Skilled",
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
      color: "#e95d15"
    },
    {
      name: "CSS 3",
      icon: css,
      color: "#0080c3"
    },
    {
      name: "JavaScript",
      icon: javascript,
      color: "#e6d450"
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
      color: "#33b7ca"
    },
    {
      name: "React JS",
      icon: reactjs,
      color: "#7ec8d6"
    },
    {
      name: "C++",
      icon: cplusplus,
      color: "#0154a7"
    },
    {
      name: "c",
      icon: c,
      color: "#0154a7"
    },
    {
      name: "C#",
      icon: csharp,
      color: "#8204fb"
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
      color: "#f15f24"
    },
  ];
  
  const experiences = [
    {
      title: "Incoming Software Engineer Intern",
      company_name: "MITRE",
      icon: mitre,
      iconBg: "#ffffff",
      date: "Starting May 2026",
      points: [
        "Incoming SWE Intern on the L537 team under Abby Chapman and Dave Hirst"
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
    {
      title: "Founder and Executive Director",
      company_name: "Tufts Leadership Training Institute (LTI)",
      icon: ltiLogo,
      iconBg: "#ffffff",
      date: "September 2024 - Present",
      points: [
        "Successfully recruited 10+ mentors for an intensive 8-week mentorship program, ensuring a high-quality and organized experience",
        "Spearheaded all meetings, planning, funding, organization, room reservation, recruitment, and admission to the program",
        "Worked alongside MIT LTI directors to effectively establish a new student organization and abide by all guidelines of the program",
      ],
    },
    {
      title: "Full-Stack Developer Intern",
      company_name: "Launch",
      icon: launch,
      iconBg: "#ffffff",
      date: "February 2025 - April 2025",
      points: [
        "Contributed to the early development of an AI-powered website builder, collaborating with a small team of designers and engineers",
        "Created an interface for end-users to customize generated websites (dragging and dropping website components, etc).",
        "Implemented innovative solutions in a timely manner to enhance user experience and functionality in a fast-paced startup environment",
      ],
    },
    {
      title: "Software Developer",
      company_name: "Tufts JumboCode",
      icon: jumbocode,
      iconBg: "#E6DEDD",
      date: "October 2023 - May 2025",
      points: [
        "2024-2025: Developed a full-stack inventory management system to help the Somerville Museum catalog and organize its collection of artifacts. Built with a PostgreSQL database (managed via Neon) and a React/Next.js frontend. Collaborated with a team of 10 developers, completing weekly tickets assigned by lead developers. \n Mentors/Tech Leads: Holden Kittelberger and Zack White",
        "2023-2024: Helped develop a full-stack inventory website for a local Somerville theatre, Theatre@First, with a group of 10 developers through weekly assigned tickets by lead developers. \n Mentors/Tech Leads: Liam Strand and Amitav Nott",
        "JumboHack Hackathon x2",
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
        "Founded this program at Tufts!",
      ],
    },
    {
      title: "Pool Lifeguard",
      company_name: "Department of Conservation and Recreation",
      icon: dcr,
      iconBg: "#383E56",
      date: "June - August 2022, 2023, and 2024",
      points: [
        "Rescued eight drowing victims in the water",
        "Responded to all emergencies and ensured proper cleanliness of the facility while enforcing pool rules and scanning zones according to Red Cross standards",
      ],
    }
  ];
    
  const projects = [
    {
      name: "CS105 Programming Languages Interpreter",
      description:
      "An educational, in-browser, no setup, IDE for interpreting seven CS105 languages like Impcore, μScheme, nano-ML, etc. Source code not available due to class confidentiality but open-source version coming soon!",
      tags: [
        {
          name: "elm",
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
          color: "orange-text-gradient",
        },
      ],
      image: interpHomePage,
      source_code_link: "https://github.com/pmorganelli",
      demo_link: "https://elm-ide-105.vercel.app/index.html", 
    },
    {
      name: "Somerville Museum Database",
      description:
      "A full-stack inventory project made for the Somerville Museum to keep track of borrowed items and props. Made for Tufts JumboCode. Click to demo!",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "orange-text-gradient",
        },
        {
          name: "nextjs",
          color: "pink-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "blue-text-gradient",
        },
        {
          name: "sql",
          color: "orange-text-gradient",
        },
        {
          name: "neon",
          color: "pink-text-gradient",
        },
      ],
      image: smCapture,
      source_code_link: "https://github.com/JumboCode/somerville-museum",
      demo_link: "https://somervillemuseum.vercel.app/", 
    },
    {
      name: "Slingshot Squires",
      description:
      "Buy crops. Defend your land at all costs. Click to demo!",
      tags: [
        {
          name: "c#",
          color: "blue-text-gradient",
        },
        {
          name: "unity",
          color: "green-text-gradient",
        },
      ],
      image: slingshotSquire,
      source_code_link: "https://github.com/pmorganelli/slingshot-squires",
      demo_link: "https://slingshotsquires.itch.io/slingshot-squires", 
    },
    {
      name: "Snowplow Race",
      description:
        "You're a snowplow driver on a busy night shift. Clear all the snow before time runs out! Click to demo.",
      tags: [
        {
          name: "c#",
          color: "blue-text-gradient",
        },
        {
          name: "unity",
          color: "green-text-gradient",
        },
      ],
      image: snowplowdriver,
      source_code_link: "https://github.com/pmorganelli/snowplow-race",
      demo_link: "https://gamedesignb11.itch.io/snowplow-race", 
    },
    {
      name: "CodeClock",
      description:
        "Are you a Tufts CS student? Are you sick and tired of keeping track of how long you spend on CS40, CS15, or any other courses? Meet CodeClock, a quick and seamless way to achieve this goal!",
      tags: [
        {
          name: "react.js",
          color: "blue-text-gradient",
        },
        {
          name: "node.js",
          color: "green-text-gradient",
        },
        {
          name: "aws",
          color: "pink-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "blue-text-gradient",
        },
        {
          name: "vscode api",
          color: "orange-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
      ],
      image: codeclock,
      source_code_link: "https://github.com/pmorganelli/vscode-timer/tree/main",
      demo_link: "https://devpost.com/software/codeclock", 
    },
    {
      name: "Image Compressor/Decompressor",
      description:
        "Utilizes a lossy compression algorithm to compress and decompress a given image. Written in C. Source code hidden for this project.",
      tags: [
        {
          name: "c",
          color: "blue-text-gradient",
        },
        {
          name: "makefile",
          color: "green-text-gradient",
        },
      ],
      image: flow,
      source_code_link: "https://github.com/pmorganelli/image-compressor",
      demo_link: "https://github.com/pmorganelli/image-compressor", 
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
      demo_link: "https://github.com/JumboCode/theatre-at-first", 
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
      source_code_link: "https://github.com/pmorganelli/grep-clone",
      demo_link: "https://github.com/pmorganelli/grep-clone",
    }

  ];
  
  export { services, technologies, experiences, projects };