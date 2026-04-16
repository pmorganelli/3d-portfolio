import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    reactjs,
    tailwind,
    git,
    dcr,
    jumbocode,
    jumbocodedark,
    tufts,
    ltiLogo,
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
          "Used in nearly every CS40: Machine Structure and Assembly Language Programming project at Tufts. Also used in Trinity College Dublin's CSU33014 Concurrent Systems class for parallelizing code with pthreads and OpenMP along with vectorization. Comfortable with manual memory management, pointers, bit manipulation, and low-level I/O.",
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
          "Daily driver for version control. Comfortable with branching, merging, rebasing, and collaborative GitHub/GitLab workflows across team projects.",
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
        level: "Intermediate",
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
        level: "Intermediate",
        orbits: "JavaScript Framework",
        description:
          "My go-to frontend framework. Used in nearly all my full-stack projects including two JumboCode teams, a hackathon, and this portfolio.",
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
          "Used with Unity for game development for CS23: Game Design at Tufts University.",
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
        level: "Familiar",
        orbits: "Containerization Platform",
        description:
          "Currently using Docker to containerize services in my Food Waste Tracking App. Comfortable with Dockerfiles, docker-compose, and multi-service setups.",
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
      color: "#049ef4",
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
          "Currently using it to build this portfolio! Exploring React 3 Fiber, Drei helpers, custom shaders, and GPU-rendered text via Cheng Lou's recently created Pretext library.",
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
        { name: "react native", color: "blue-text-gradient" },
        { name: "typescript",   color: "green-text-gradient" },
        { name: "firebase",     color: "pink-text-gradient" },
        { name: "springboot",   color: "orange-text-gradient" },
        { name: "postgresql",   color: "blue-text-gradient" },
        { name: "docker",       color: "green-text-gradient" },
      ],
      image: foodWasteHome,
      source_code_link: "https://github.com/pmorganelli",
      demo_link: "https://github.com/pmorganelli",
      inProgress: true,
      details: {
        overview: "A cross-platform mobile app designed to reduce household food waste by giving users a simple way to log what's in their fridge, track expiration dates, and get AI-generated recipe suggestions based on ingredients that are about to go bad.",
        role: "Developed in a team of six for CSU44098 Group Design Project at Trinity College Dublin. Responsible for handling end-to-end authentication in Firebase, redesigning our React Native UI, and creating a Claude Vision powered expiration date predictor for expiration dates.",
        built: [
          "React Native + TypeScript frontend with Expo for rapid cross-platform development on iOS and Android",
          "Barcode scanning via the device camera to auto-populate food item metadata from a public nutrition database API",
          "Firebase Authentication for secure sign-in and per-user data isolation",
          "Spring Boot REST API handling business logic, expiration calculations, and AI recipe generation requests",
          "PostgreSQL database for persistent storage of food items, user profiles, and recipe history",
          "Docker Compose for consistent local development across the frontend, backend, and database services",
        ],
        highlights: [
          "Integrated the Claude API to generate personalized recipes from the user's specific expiring ingredients",
          "Helped design an expiration tracking system with push-notification reminders as items approach their use-by date",
          "Worked with a containerized application in Docker and adopted a shell script in the root directory so any developer can spin up a working environment with a single command",
        ],
      },
    },
    {
      name: "CS105 Programming Languages Interpreter",
      description:
        "An educational, in-browser, no setup, IDE for interpreting seven CS105 languages like Impcore, μScheme, nano-ML, etc. Source code not available due to class confidentiality but open-source version coming soon!",
      tags: [
        { name: "elm",        color: "blue-text-gradient" },
        { name: "javascript", color: "green-text-gradient" },
        { name: "html",       color: "pink-text-gradient" },
        { name: "css",        color: "orange-text-gradient" },
      ],
      image: interpHomePage,
      source_code_link: "https://github.com/pmorganelli",
      demo_link: "https://elm-ide-105.vercel.app/index.html",
      privateRepo: true,
      details: {
        overview: "A fully in-browser IDE built for Tufts' CS105 Programming Languages course. Students can write and run code in seven different languages — ranging from Impcore to nano-ML — without installing anything. The interpreter runs entirely client-side, making it accessible from any device, but it's designed to be used on a computer.",
        role: "Led the entire fullstack architecture and the Elm-based interpreter integration, working within the constraints of a course confidentiality agreement by obfuscating source code.",
        built: [
          "Elm for the core application logic and UI — chosen for its strong type system and built-in functional programming that match the course's language theory content",
          "JavaScript (Elm ports) to bridge the interpreter engine with the browser environment",
          "Custom syntax highlighting and error display tuned to each of the seven supported languages",
          "Utilized the browser's localStorage to persist code sessions across browsers",
        ],
        highlights: [
          "Supports seven distinct language grammars in a single cohesive interface: Impcore, μScheme, μSmalltalk, nano-ML, typed-Impcore, typed-μScheme, μML, and Molecule",
          "Zero-setup installation — students open a URL and start coding, nothin else required",
          "An open-source version is in progress",
        ],
      },
    },
    {
      name: "Somerville Museum Database",
      description:
        "A full-stack inventory project made for the Somerville Museum to keep track of borrowed items and props. Made for Tufts JumboCode. Click to demo!",
      tags: [
        { name: "react",      color: "blue-text-gradient" },
        { name: "javascript", color: "orange-text-gradient" },
        { name: "nextjs",     color: "pink-text-gradient" },
        { name: "nodejs",     color: "green-text-gradient" },
        { name: "sql",        color: "blue-text-gradient" },
        { name: "neon",       color: "orange-text-gradient" },
      ],
      image: smCapture,
      source_code_link: "https://github.com/JumboCode/somerville-museum",
      demo_link: "https://somervillemuseum.vercel.app/",
      details: {
        overview: "A production full-stack inventory management system built for the Somerville Museum through Tufts JumboCode. The museum staff use it to catalog artifacts, track loans, and manage their collection — replacing a fragile spreadsheet workflow with a searchable, role-protected database.",
        role: "Full-stack developer on a team of 10, completing weekly feature tickets assigned by tech leads Holden Kittelberger and Zack White.",
        built: [
          "Next.js App Router for server-side rendering and API routes in a single codebase",
          "React frontend with a component library built from scratch to match the museum's brand guidelines",
          "PostgreSQL database hosted on Neon (serverless Postgres) — chosen for its branch-based development workflow",
          "Node.js API layer handling search indexing and item loan tracking",
          "Role-based access control distinguishing admin staff from read-only volunteers",
        ],
        highlights: [
          "Shipped a live production app actively used by Somerville Museum staff",
          "Collaborated asynchronously across a 10-person team using GitHub Projects, weekly standups, and Slack",
          "Implemented full-text search across the artifact catalog so staff can find items by name, category, or condition",
        ],
      },
    },
    {
      name: "Slingshot Squires",
      description:
        "Buy crops. Defend your land at all costs. Click to demo!",
      tags: [
        { name: "c#",   color: "blue-text-gradient" },
        { name: "unity", color: "green-text-gradient" },
      ],
      image: slingshotSquire,
      source_code_link: "https://github.com/pmorganelli/slingshot-squires",
      demo_link: "https://slingshotsquires.itch.io/slingshot-squires",
      details: {
        overview: "A medieval crop defense and resource-management game where you purchase crops, sell them for currency, and fend off waves of enemies trying to overrun your land. Built for a Tufts game design course and published on itch.io.",
        role: "Programmer in a group of six responsible for the core slingshot mechanics, enemy pathfinding, and occasionally the resource economy systems.",
        built: [
          "Unity game engine with C# scripts driving all gameplay systems",
          "Implemented a physics-based slingshot inspired by Angry birds",
          "Wave spawning system with escalating enemy difficulty curves tuned through Unity's Inspector for rapid playtesting",
          "Economy system balancing crop income against defensive spending — iterated heavily based on playtesting feedback",
          "Published and hosted on itch.io with WebGL build for instant in-browser play",
        ],
        highlights: [
          "Designed and balanced the entire resource economy from scratch — finding the fun through iteration",
          "Implemented pathfinding for enemy units navigating around dynamically placed defenses",
          "Shipped a complete, playable game within a single semester under tight deadlines",
          "Styling and themes inspired by Stardew Valley"
        ],
      },
    },
    {
      name: "Snowplow Race",
      description:
        "You're a snowplow driver on a busy night shift. Clear all the snow before time runs out! Click to demo.",
      tags: [
        { name: "c#",    color: "blue-text-gradient" },
        { name: "unity", color: "green-text-gradient" },
      ],
      image: snowplowdriver,
      source_code_link: "https://github.com/pmorganelli/snowplow-race",
      demo_link: "https://gamedesignb11.itch.io/snowplow-race",
      details: {
        overview: "Midterm project for CS23: Game Design at Tufts University. You pilot a snowplow through increasingly chaotic city streets, racing against the clock to clear snow before morning traffic arrives.",
        role: "Programmer and co-designer — implemented vehicle physics, the snow accumulation system, and the scoring pipeline.",
        built: [
          "Unity with C# for all game logic and physics interactions",
          "Custom vehicle controller fit for WASD or arrows with steering feel tuned for handling",
          "Procedural snow tile system that tracks cleared vs. uncleared areas as a percentage for the win condition",
          "Time-pressure scoring system with incentive for consecutive clears",
          "WebGL build deployed to itch.io for immediate browser play with no download required",
        ],
        highlights: [
          "The game remains publicly playable on itch.io and was made alongside Professor Emeritus Dr. Norman Ramsey",
          "Collaborated with a small team, dividing art, design, and programming responsibilities under a course deadline",
        ],
      },
    },
    {
      name: "CodeClock",
      description:
        "Are you a Tufts CS student? Are you sick and tired of keeping track of how long you spend on CS40, CS15, or any other courses? Meet CodeClock, a quick and seamless way to achieve this goal!",
      tags: [
        { name: "react.js",  color: "blue-text-gradient" },
        { name: "node.js",   color: "green-text-gradient" },
        { name: "aws",       color: "pink-text-gradient" },
        { name: "tailwindcss", color: "blue-text-gradient" },
        { name: "vscode api",  color: "orange-text-gradient" },
        { name: "mongodb",     color: "green-text-gradient" },
      ],
      image: codeclock,
      source_code_link: "https://github.com/pmorganelli/vscode-timer/tree/main",
      demo_link: "https://devpost.com/software/codeclock",
      details: {
        overview: "A VS Code extension and web dashboard built in a weekend at Tufts JumboHack that lets Tufts CS students automatically track time spent on each course's assignments — without any manual input. The extension detects which project folder is active and silently logs coding sessions in the background.",
        role: "Built the VS Code extension, REST API, and React dashboard end-to-end over a weekend hackathon.",
        built: [
          "VS Code Extension API to detect active workspace, start/stop session timers, and push session data to the backend",
          "Node.js + Express REST API deployed on AWS EC2 for handling session ingestion and aggregation",
          "MongoDB Atlas for storing time-series session records per user and per course",
          "React + Tailwind CSS dashboard for visualizing weekly coding hours broken down by course",
          "AWS infrastructure (EC2 + security groups) configured and deployed within the hackathon window",
        ],
        highlights: [
          "Built the entire product — extension, API, database, and frontend — with a small group of developers",
          "Once installed and launched, the extension runs silently with no manual start/stop required",
          "Presented to a panel of judges and received recognition for technical depth and practical usefulness for the Tufts CS community",
        ],
      },
    },
    {
      name: "Image Compressor/Decompressor",
      description:
        "Utilizes a lossy compression algorithm to compress and decompress a given image. Written in C. Source code hidden for this project.",
      tags: [
        { name: "c",        color: "blue-text-gradient" },
        { name: "makefile", color: "green-text-gradient" },
      ],
      image: flow,
      source_code_link: "https://github.com/pmorganelli/image-compressor",
      demo_link: "https://github.com/pmorganelli/image-compressor",
      privateRepo: true,
      noDemo: true,
      details: {
        overview: "A lossy image compression and decompression pipeline written entirely in C for Tufts' CS40: Machine Structure and Assembly Language Programming. The program converts raster images into a compact binary format and reconstructs them with controlled quality loss, similar in spirit to how JPEG compression works.",
        role: "Co-author alongside a lab partner — responsible for the color space conversion pipeline and the quantization stages.",
        built: [
          "Implemented in C with manual memory management — no garbage collection, no abstractions beyond what we wrote",
          "Color space conversion from RGB to a luminance/chroma representation to concentrate compression on less perceptible channels",
          "Discrete Cosine Transform (DCT) applied to 2x2 pixel blocks to convert spatial data to frequency components",
          "Quantization step to discard high-frequency coefficients — the core of the lossy compression trade-off",
          "Bitpacking to encode compressed data into a custom binary file format with a minimal header",
          "Full decompression pipeline reversing every step to reconstruct the image from the compressed binary",
        ],
        highlights: [
          "Achieved meaningful file size reduction while keeping perceptual quality high enough to be visually indistinguishable at normal viewing distances",
          "Built entirely without image-processing libraries — every algorithm implemented from first principles",
          "One of the most technically demanding projects in the Tufts CS curriculum; deepened understanding of how real-world formats like JPEG actually work",
        ],
      },
    },
    {
      name: "Theatre@First",
      description:
        "Inventory application for a local Somerville theater. Contributed alongside a team of 10 developers.",
      tags: [
        { name: "react",      color: "blue-text-gradient" },
        { name: "typescript", color: "green-text-gradient" },
        { name: "next.js",    color: "pink-text-gradient" },
        { name: "tailwind",   color: "blue-text-gradient" },
        { name: "drizzleorm", color: "orange-text-gradient" },
      ],
      // React.js, Clerk, TypeScript, Next.js, TailwindCSS, DrizzleORM, GitHub, Slack, Figma
      image: theatre,
      source_code_link: "https://github.com/JumboCode/theatre-at-first",
      noDemo: true,
      details: {
        overview: "A full-stack costume and prop inventory system built for Theatre@First, a community theater in Somerville, MA. The app allows staff to browse, check out, and track the status of hundreds of items across productions — replacing their previous paper-and-spreadsheet system.",
        role: "Full-stack developer on a 10-person JumboCode team, working under tech leads Liam Strand and Amitav Nott. Completed weekly feature tickets across both the frontend and backend.",
        built: [
          "Next.js 14 with App Router for server components and type-safe API routes",
          "TypeScript throughout — enforced strict types on all data models, API payloads, and component props",
          "Clerk for authentication — handles user sessions, role management, and OAuth login with zero backend auth code",
          "DrizzleORM with a PostgreSQL database for type-safe queries with full schema migration support",
          "Tailwind CSS for a consistent, responsive UI across desktop and tablet (primary staff devices)",
          "Figma designs reviewed and implemented collaboratively with the team's designers",
        ],
        highlights: [
          "Shipped a production app used by real theater staff managing a real catalog of props and costumes",
          "First project where I worked extensively with TypeScript in a team setting — improved code confidence significantly",
          "Learned to navigate a large shared codebase with 10 contributors, resolving merge conflicts and submitting PRs",
        ],
      },
    },
    {
      name: "Basic Portfolio Website",
      description:
        "Developed a responsive portfolio website, demonstrating strong front-end web development skills and modern web design principles",
      tags: [
        { name: "react",      color: "blue-text-gradient" },
        { name: "javascript", color: "green-text-gradient" },
        { name: "html",       color: "pink-text-gradient" },
        { name: "css",        color: "blue-text-gradient" },
        { name: "vite",       color: "green-text-gradient" },
      ],
      image: basic,
      source_code_link: "https://github.com/pmorganelli/portfolio-website",
      demo_link: "https://basicpetermorganelli.vercel.app/",
      details: {
        overview: "My first personal portfolio website — a clean, responsive single-page app built with React and Vite. This was the project that solidified my frontend fundamentals and got me comfortable with modern React patterns, component architecture, and deploying to production.",
        role: "Solo project — designed, built, and deployed everything independently.",
        built: [
          "React 18 with functional components and hooks for all state and side-effect management",
          "Vite as the build tool — dramatically faster HMR than Create React App, which introduced me to modern tooling",
          "Vanilla CSS with custom properties for theming and responsive layouts without a utility framework",
          "React Router for client-side navigation between sections",
          "Deployed on Vercel with automatic preview deployments on every pull request",
        ],
        highlights: [
          "First fully self-directed project from blank repo to live production URL",
          "Led directly to this portfolio — the experience building it made me want to push much further with 3D and animation",
          "Still live at the demo link as a reference point for how far the work has come",
        ],
      },
    },
    {
      name: "gerp",
      description:
        "Replicated the Unix \"grep\" program using C++, Hash Tables, and Vectors. Made with a partner for a Data Structures class. Source and demo unavailable... ;)",
      tags: [
        { name: "c++",            color: "blue-text-gradient" },
        { name: "data structures", color: "green-text-gradient" },
      ],
      image: portfolio,
      source_code_link: "https://github.com/pmorganelli/grep-clone",
      demo_link: "https://github.com/pmorganelli/grep-clone",
      privateRepo: true,
      noDemo: true,
      details: {
        overview: "A full reimplementation of the Unix grep command-line tool, built in C++ for Tufts' CS15 Data Structures course. Given a query string and a directory, gerp recursively indexes every file and returns all lines containing a match — case-sensitive or case-insensitive — in milliseconds.",
        role: "Co-author with a lab partner. Responsible for the hash table implementation, the file traversal pipeline, and query normalization.",
        built: [
          "C++ with the standard library vectors, unordered_map, and file streams as the primary building blocks",
          "Custom hash table implementation mapping normalized words to a list of (file, line number) pairs for O(1) average-case lookup",
          "Query normalization stripping leading/trailing punctuation so searches behave intuitively",
          "Streamed output to stdout to handle result sets larger than available memory without buffering everything at once",
        ],
        highlights: [
          "Indexed and queried multi-megabyte directory trees in under a second — performance validated against the reference implementation",
          "One of the most complex data structures projects in the Tufts CS15 curriculum; required careful memory management with no leaks under Valgrind",
          "The project deepened my understanding of how real search tools are built — hash-based indexing, normalization tradeoffs, and I/O efficiency",
        ],
      },
    },
  ];
  
  export { services, technologies, experiences, projects };