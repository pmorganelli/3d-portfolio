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
    foodWasteHome,
    mitre,
    typeScriptIcon,
    dockerLogo,
    gitlabLogo,
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
      desc: "I've constructed multiple websites with modern frontend frameworks",
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
  
  // Solar system hierarchy:
  //   Sun    — C++ (center of proficiency)
  //   Ring 1 — C, Git          (r=6.5,  180° apart)  — small rocky
  //   Ring 2 — JS, React, TS, Tailwind (r=12.0, 90°) — medium planets
  //   Ring 3 — C#              (r=17.5)               — gas giant
  //   Ring 4 — Three.js        (r=22.5)               — outer planet
  //
  // decalScale adjusts the projected icon size to compensate for image padding.
  const technologies = [
    // ── Sun ────────────────────────────────────────────────────────────────────
    {
      name: "C++",
      icon: cplusplus,
      color: "#0154a7",
      tag: "STL",
      isSun: true,
      size: 3.8,
      orbitRadius: 0,
      orbitSpeed: 0,
      angleOffset: 0,
      decalScale: 1.0,
      info: {
        level: "Proficient",
        orbits: "Center of the System",
        description:
          "Extensively used in Tufts Computer Science curriculum. Made every CS15: Data Structres assignment in C++ and then subsequently became a TA for three semesters and Grading TF for one semester.",
        projects: [
          { name: "gerp (grep clone)", link: "https://github.com/pmorganelli/grep-clone" },
        ],
      },
    },
    // ── Ring 1 — C and Git (same orbit, 180° apart) ───────────────────────────
    {
      name: "C",
      icon: c,
      color: "#0154a7",
      tag: "C99",
      isSun: false,
      size: 0.85,
      orbitRadius: 6.5,
      orbitSpeed: 0.35,
      angleOffset: 0,
      decalScale: 1.0,
      info: {
        level: "Intermediate",
        orbits: "Low-Level Systems Language",
        description:
          "Used in systems programming coursework at Tufts. Comfortable with manual memory management, pointers, bit manipulation, and low-level I/O.",
        projects: [
          { name: "Image Compressor", link: "https://github.com/pmorganelli/image-compressor" },
        ],
      },
    },
    {
      name: "Git",
      icon: git,
      color: "#f15f24",
      tag: "VCS",
      isSun: false,
      size: 0.85,
      orbitRadius: 6.5,
      orbitSpeed: 0.35,
      angleOffset: 3.14159,
      decalScale: 1.0,
      info: {
        level: "Proficient",
        orbits: "Version Control System",
        description:
          "Daily driver for version control. Comfortable with branching, merging, rebasing, and collaborative GitHub workflows across team projects.",
        projects: [
          { name: "Somerville Museum DB", link: "https://github.com/JumboCode/somerville-museum" },
          { name: "Theatre@First", link: "https://github.com/JumboCode/theatre-at-first" },
        ],
      },
    },
    // ── Ring 2 — JS, React, TypeScript, Tailwind (same orbit, 90° apart) ──────
    {
      name: "JavaScript",
      icon: javascript,
      color: "#e6d450",
      tag: "ES2024",
      isSun: false,
      size: 1.5,
      orbitRadius: 12.0,
      orbitSpeed: 0.20,
      angleOffset: 0,
      decalScale: 1.0,
      info: {
        level: "Advanced",
        orbits: "Scripting Language",
        description:
          "My primary language for web development. Used across full-stack apps, browser extensions, and interactive UIs — including this portfolio.",
        projects: [
          { name: "CS105 Interpreter", link: "https://elm-ide-105.vercel.app/index.html" },
          { name: "Somerville Museum DB", link: "https://somervillemuseum.vercel.app/" },
          { name: "CodeClock", link: "https://devpost.com/software/codeclock" },
        ],
      },
    },
    {
      name: "React JS",
      icon: reactjs,
      color: "#7ec8d6",
      tag: "v18",
      isSun: false,
      size: 1.4,
      orbitRadius: 12.0,
      orbitSpeed: 0.20,
      angleOffset: 1.5708,
      decalScale: 1.0,
      info: {
        level: "Advanced",
        orbits: "JavaScript Framework",
        description:
          "My go-to frontend framework. Used in multiple full-stack projects including two JumboCode teams, a hackathon, and this portfolio.",
        projects: [
          { name: "Somerville Museum DB", link: "https://somervillemuseum.vercel.app/" },
          { name: "Theatre@First", link: "https://github.com/JumboCode/theatre-at-first" },
          { name: "CodeClock", link: "https://devpost.com/software/codeclock" },
        ],
      },
    },
    {
      name: "TypeScript",
      icon: typeScriptIcon,
      color: "#3178c6",
      tag: "v5",
      isSun: false,
      size: 1.4,
      orbitRadius: 12.0,
      orbitSpeed: 0.20,
      angleOffset: 3.14159,
      decalScale: 0.75,
      info: {
        level: "Learning",
        orbits: "JavaScript Superset",
        description:
          "Increasingly using TypeScript in React projects for type safety. Applied it in Theatre@First and the Food Waste Tracking App.",
        projects: [
          { name: "Theatre@First", link: "https://github.com/JumboCode/theatre-at-first" },
          { name: "Food Waste App", link: "https://github.com/pmorganelli" },
        ],
      },
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
      color: "#33b7ca",
      tag: "v3.x",
      isSun: false,
      size: 1.2,
      orbitRadius: 12.0,
      orbitSpeed: 0.20,
      angleOffset: 4.7124,
      decalScale: 1.0,
      info: {
        level: "Proficient",
        orbits: "CSS Utility Framework",
        description:
          "Preferred utility framework for rapid, consistent UI styling in React projects. Used it on every recent web project.",
        projects: [
          { name: "Theatre@First", link: "https://github.com/JumboCode/theatre-at-first" },
          { name: "CodeClock", link: "https://devpost.com/software/codeclock" },
        ],
      },
    },
    // ── Ring 3 — C# ────────────────────────────────────────────────────────────
    {
      name: "C#",
      icon: csharp,
      color: "#8204fb",
      tag: ".NET",
      isSun: false,
      size: 2.0,
      orbitRadius: 17.5,
      orbitSpeed: 0.11,
      angleOffset: 0.5,
      decalScale: 1.4,
      info: {
        level: "Intermediate",
        orbits: "Object-Oriented Language",
        description:
          "Used with Unity for game development. Familiar with component-based architecture, MonoBehaviour lifecycles, and game loops.",
        projects: [
          { name: "Slingshot Squires", link: "https://slingshotsquires.itch.io/slingshot-squires" },
          { name: "Snowplow Race", link: "https://gamedesignb11.itch.io/snowplow-race" },
        ],
      },
    },
    // Docker: 0.5 + 2π/3 ≈ 2.5944 rad   GitLab: 0.5 + 4π/3 ≈ 4.6888 rad
    {
      name: "Docker",
      icon: dockerLogo,
      color: "#1d63ed",
      tag: "v27",
      isSun: false,
      size: 1.8,
      orbitRadius: 17.5,
      orbitSpeed: 0.11,
      angleOffset: 2.5944,
      decalScale: 1.0,
      info: {
        level: "Learning",
        orbits: "Containerization Platform",
        description:
          "Using Docker to containerize services in the Food Waste Tracking App. Comfortable with Dockerfiles, docker-compose, and multi-service setups.",
        projects: [
          { name: "Food Waste App", link: "https://github.com/pmorganelli" },
        ],
      },
    },
    {
      name: "GitLab",
      icon: gitlabLogo,
      color: "#fc6d26",
      tag: "CI/CD",
      isSun: false,
      size: 1.8,
      orbitRadius: 17.5,
      orbitSpeed: 0.11,
      angleOffset: 4.6888,
      decalScale: 1.0,
      info: {
        level: "Learning",
        orbits: "DevOps Platform",
        description:
          "Introduced to GitLab pipelines and CI/CD workflows during the Food Waste Tracker project. Familiar with merge requests, pipelines, and repository management.",
        projects: [
          { name: "Food Waste Tracker", link: "#projects" },
        ],
      },
    },
    // ── Ring 4 — Three.js ──────────────────────────────────────────────────────
    {
      name: "Three.js",
      icon: threejs,
      color: "#ffffff",
      tag: "r166",
      isSun: false,
      size: 1.5,
      orbitRadius: 22.5,
      orbitSpeed: 0.07,
      angleOffset: 1.2,
      decalScale: 1.0,
      info: {
        level: "Learning",
        orbits: "3D Graphics Library",
        description:
          "Currently using it to build this portfolio! Exploring R3F, Drei helpers, custom shaders, and GPU-rendered text via Pretext.",
        projects: [
          { name: "This Portfolio", link: "#" },
        ],
      },
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
      date: "September 2024 - December 2025",
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
      date: "September 2024 - September 2025",
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
      name: "Mobile Food Waste Tracking App",
      description:
      "In Progress! A smart and easy way to keep track of your food that's going bad. Scan a barcode, store your item, and even make an AI-generated recipe with your ingredients!",
      tags: [
        {
          name: "react native",
          color: "blue-text-gradient",
        },
        {
          name: "typescript",
          color: "green-text-gradient",
        },
        {
          name: "firebase",
          color: "pink-text-gradient",
        },
        {
          name: "springboot",
          color: "orange-text-gradient",
        },
        {
          name: "postgresql",
          color: "blue-text-gradient",
        },
        {
          name: "docker",
          color: "green-text-gradient",
        }
      ],
      image: foodWasteHome,
      source_code_link: "https://github.com/pmorganelli",
      demo_link: "https://elm-ide-105.vercel.app/index.html",
      inProgress: true,
    },
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