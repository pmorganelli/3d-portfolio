import {
    javascript,
    reactjs,
    tailwind,
    git,
    dcr,
    jumbocode,
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
    pizzeriaHome,
    brickedFront,
    brickedNfc,
    dropwheelCover,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "work",
      title: "Experience",
    },
    {
      id: "tech",
      title: "Technologies",
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
          "Extensively used in Tufts Computer Science curriculum. Made every CS15: Data Structures assignment in C++ and then subsequently became a TA for three semesters and Grading TF for one semester.",
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
          { name: "Food Waste App", link: "#projects" },
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
          { name: "Food Waste App", link: "#projects" },
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
          { name: "This Portfolio", link: "https://github.com/pmorganelli/3d-portfolio" },
        ],
      },
    },
  ];
  
  const experiences = [
    {
      title: "Software Engineer Intern",
      company_name: "MITRE",
      icon: mitre,
      iconBg: "#ffffff",
      date: "May 2026 - August 2026",
      points: [
        "Parallelized bounded requirement verification for a GraphRAG application with a four-worker async request pool handling retries and rate limiting, cutting end-to-end runtime by 77% on large Excel imports",
        "Shipped features on a Django requirements platform over a Neo4j graph database, maintaining traceability between source requirements, system-model data, and LLM-generated findings for Air Force CUI systems",
        "Presented AI agent orchestration and model prompting workflows to 50+ senior engineers"
      ],
    },
    {
      title: "Data Structures TA and TF",
      company_name: "Tufts University",
      icon: tufts,
      iconBg: "#383E56",
      date: "September 2024 - Present",
      points: [
        "Own grading standards for a 200+ student course, setting the staff-wide call on ambiguous rubric criteria across 300+ submissions",
        "Revise project specifications and lecture material with faculty; support students in office hours and on Piazza",
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
        "2024-2025: Developed a full-stack inventory management system to help the Somerville Museum catalog and organize its collection of artifacts. Built with a PostgreSQL database (managed via Neon) and a React/Next.js frontend. Collaborated with a team of 10 developers, completing weekly tickets assigned by lead developers.",
        "Mentors/Tech Leads (2024–2025): Holden Kittelberger and Zack White",
        "2023-2024: Helped develop a full-stack inventory website for a local Somerville theatre, Theatre@First, with a group of 10 developers through weekly assigned tickets by lead developers.",
        "Mentors/Tech Leads (2023–2024): Liam Strand and Amitav Nott",
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
        "Rescued eight drowning victims in the water",
        "Responded to all emergencies and ensured proper cleanliness of the facility while enforcing pool rules and scanning zones according to Red Cross standards",
      ],
    }
  ];
    
  const projects = [
    {
      name: "Bricked",
      description:
        "A 3D-printed block with an NFC tag that blocks distracting apps when I tap my phone on it (Instagram, Tiktok) using the Foqos app.",
      tags: [
        { name: "3d printing", color: "blue-text-gradient" },
        { name: "nfc",         color: "green-text-gradient" },
        { name: "prusaslicer", color: "orange-text-gradient" },
      ],
      image: brickedFront,
      gallery: [{ src: brickedNfc, alt: "Back of the Bricked case with its NFC tag" }],
      privateRepo: true,
      noDemo: true,
      details: {
        overview: "A homemade version of Brick, the gadget you tap your phone against to block distracting apps. A 3D-printed case carries an NFC tag, and tapping my phone on it blocks the apps I've chosen.",
        role: "Solo project, from the print to the NFC setup.",
        built: [
          "56 mm rounded-square case, 8 mm thick, with debossed BRICKED lettering",
          "Sliced in PrusaSlicer and printed in PLA on a Prusa MK4 at 0.2 mm layers and 15% infill",
          "NFC sticker tag mounted on the back of the case",
        ],
        highlights: [
          "A plate of four cases prints in about an hour and a half",
          "Each case uses roughly 12 g of filament",
        ],
      },
    },
    {
      name: "Dropwheel",
      description:
        "A macOS menu-bar app that converts files mid-drag: hold Shift, drop on a format, done. My from-scratch clone of Tangerine, built with Claude.",
      tags: [
        { name: "swift", color: "orange-text-gradient" },
        { name: "swiftui", color: "blue-text-gradient" },
        { name: "appkit", color: "green-text-gradient" },
        { name: "ffmpeg", color: "pink-text-gradient" },
        { name: "claude", color: "orange-text-gradient" },
      ],
      image: dropwheelCover,
      privateRepo: true,
      noDemo: true,
      details: {
        overview:
          "A macOS menu-bar app for converting files while you drag them. Hold Shift during a Finder drag and a wheel of output formats opens around the pointer, drop on one and the converted copy is saved next to the original. Everything runs locally.",
        role:
          "A personal reimplementation of the idea behind Tangerine, built with Claude Code. It shares no code or assets with the original.",
        built: [
          "Swift with AppKit and SwiftUI: about 7,500 lines across 32 files, built with Swift Package Manager and no Xcode project",
          "A global event monitor plus the drag pasteboard's change count detects file drags that start in other apps",
          "The wheel is a floating panel whose petals are drop targets",
          "Conversion runs through ImageIO, PDFKit, AVFoundation, and Homebrew's ffmpeg, cwebp, and exiftool",
          "A headless command-line mode and scripted UI tests that perform real Finder drags",
        ],
        highlights: [
          "Three wheels: convert (Shift), tools (Option-Shift), and actions (Control-Option)",
          "Converts images, video, audio, PDFs, documents, subtitles, and archives",
          "Tools include compress to a target size, strip metadata, loudness normalization, PDF merge and split, and QR reading",
          "The release app is about 1.5 MB",
        ],
      },
    },
    {
      name: "Saturday Slices",
      description:
        "A website and full ordering system for our student-run pizzeria. Check it out!",
      tags: [
        { name: "react", color: "blue-text-gradient" },
        { name: "vercel", color: "green-text-gradient" },
        { name: "claude", color: "orange-text-gradient" },
        { name: "upstash redis", color: "pink-text-gradient" },
        { name: "vite", color: "blue-text-gradient" },
        { name: "pretext", color: "green-text-gradient" },
        { name: "gsap", color: "orange-text-gradient" },
      ],
      image: pizzeriaHome,
      privateRepo: false,
      noDemo: false,
      source_code_link: "https://github.com/pmorganelli/peters-pizzeria-site",
      demo_link: "https://saturdayslices.com",
      details: {
        overview:
          "Marketing site and ordering system for my student-run pizzeria. Staff enter orders at the window and run the night from a live admin board, and customers follow their slices on a public status page.",
        role:
          "Built the React front end, the Vercel serverless API, and the order workflow we use on pizza nights.",
        built: [
          "React 19 single-page app with hand-rolled History API routing (no React Router), GSAP scroll reveals, and Tailwind",
          "Vercel serverless API for orders, store hours, and admin auth, with all pricing computed server-side from a shared catalog",
          "Upstash Redis for orders, store settings, and rate limiting, with an in-memory fallback for local development",
          "Admin board behind an HMAC-signed HttpOnly cookie, polling for live orders",
          "Vitest suite and production build run in CI on every pull request",
        ],
        highlights: [
          "Dough stock is checked and committed in one Redis Lua script, so two staff devices can't both sell the last slice",
          "Per-slice add-ons carried through the cart, server-side validation and pricing, and the admin view",
          "Open/closed/auto store hours and a sold-out (86) list, both enforced on the server",
          "Used Claude throughout development for features, refactors, and bug fixes",
        ],
      },
    },
    {
      name: "Mobile Food Waste Tracking App",
      description:
        "A smart and easy way to keep track of your food that's going bad. Scan a barcode, store your item, and even make an AI-generated recipe with your ingredients!",
      tags: [
        { name: "react native", color: "blue-text-gradient" },
        { name: "typescript",   color: "green-text-gradient" },
        { name: "firebase",     color: "pink-text-gradient" },
        { name: "springboot",   color: "orange-text-gradient" },
        { name: "postgresql",   color: "blue-text-gradient" },
        { name: "docker",       color: "green-text-gradient" },
      ],
      image: foodWasteHome,
      privateRepo: true,
      noDemo: true,
      details: {
        overview: "A cross-platform mobile app for cutting household food waste. Log what's in your fridge, track expiration dates, and get AI-generated recipes for ingredients that are about to go bad.",
        role: "Built by a team of six for CSU44098 Group Design Project at Trinity College Dublin. I handled Firebase authentication, redesigned the React Native UI, and built the Claude Vision expiration-date scanner.",
        built: [
          "React Native and TypeScript with Expo, running on iOS and Android",
          "Camera barcode scanning that fills in item details from Open Food Facts",
          "Firebase Authentication with a separate inventory per user",
          "Spring Boot REST API for inventory, expiration logic, and recipe requests",
          "PostgreSQL for storage, with Docker Compose for local development",
        ],
        highlights: [
          "Photograph a label and Claude Vision reads the expiration date",
          "Recipes generated by the Claude API from the user's expiring ingredients",
          "Push-notification reminders as items approach their use-by date",
          "Wrote the start script that brings up the whole stack with one command",
        ],
      },
    },
    {
      name: "CS105 Programming Languages Interpreter",
      description:
        "An educational, in-browser, no setup, IDE for interpreting nine CS105 languages like Impcore, μScheme, nano-ML, etc. Source code not available due to class confidentiality but open-source version coming soon!",
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
        overview: "An in-browser IDE for Tufts' CS105 Programming Languages course. Students write and run code in the course's nine languages without installing anything. The interpreters run entirely client-side; the layout is designed for a laptop or desktop.",
        role: "Designed and built the app myself. The course interpreters are confidential, so their source is obfuscated at build time.",
        built: [
          "Elm for the UI and application state",
          "JavaScript, connected through Elm ports, to run the compiled interpreters",
          "Editor and interactive terminal in resizable panels",
          "localStorage to keep code between sessions",
          "esbuild script that bundles and obfuscates the interpreters before deploy",
        ],
        highlights: [
          "Nine languages in one interface: Impcore, μScheme, μScheme+, Typed Impcore, Typed μScheme, nano-ML, μML, Molecule, and μSmalltalk",
          "No setup: open the URL and start coding",
          "Closed source because the course interpreters are confidential",
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
      demo_link: "https://jumbocode.org/projects/somerville-museum",
      details: {
        overview: "A full-stack inventory system built for the Somerville Museum through Tufts JumboCode. Staff use it to catalog items and track what has been borrowed, replacing a spreadsheet workflow.",
        role: "Full-stack developer on a team of 10, completing weekly tickets assigned by tech leads Holden Kittelberger and Zack White.",
        built: [
          "Next.js with a React front end and API routes in one codebase",
          "PostgreSQL hosted on Neon",
          "Node.js API layer for inventory search and loan tracking",
        ],
        highlights: [
          "Shipped to production for the museum's staff",
          "Worked across a 10-person team with weekly tickets and standups",
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
        overview: "A medieval crop-defense game: buy crops, sell them for coin, and fend off waves of enemies trying to overrun your land. Built for a Tufts game design course and published on itch.io.",
        role: "Programmer in a group of six. I worked on the slingshot mechanics and enemy pathfinding, and helped with the resource economy.",
        built: [
          "Unity, with C# scripts for all gameplay systems",
          "Physics-based slingshot inspired by Angry Birds",
          "Wave spawner with escalating difficulty, tuned in the Unity Inspector during playtests",
          "Economy balancing crop income against defensive spending",
          "WebGL build hosted on itch.io, playable in the browser",
        ],
        highlights: [
          "Enemies path around defenses the player places mid-game",
          "A complete, playable game shipped in one semester",
          "Art direction inspired by Stardew Valley",
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
        overview: "Midterm project for CS23: Game Design at Tufts. You drive a snowplow through city streets, racing the clock to clear the snow before time runs out.",
        role: "Programmer and co-designer on a small team.",
        built: [
          "Unity, with C# for all game logic",
          "Physics-based plow steering on WASD, with colliders tuned so the plow doesn't snag on road edges",
          "Snow stored as a tilemap: a trigger collider on the plow clears nearby tiles and adds to the score",
          "WebGL build on itch.io, playable in the browser",
        ],
        highlights: [
          "Made alongside Professor Emeritus Dr. Norman Ramsey",
          "Still publicly playable on itch.io",
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
        overview: "A VS Code extension and web dashboard that track how long Tufts CS students spend on each assignment. Start the timer when you begin a project and stop it when you submit; your sessions feed a leaderboard you can compare with friends. Built in a weekend at JumboHack 2025.",
        role: "One of six on the team. I wrote most of the VS Code extension and handled its testing.",
        built: [
          "VS Code Extension API: commands to start, stop, and check the timer, with editor activity used to separate active time from idle time",
          "Next.js and React dashboard with leaderboard, profile, and session-log pages, styled with Tailwind",
          "MongoDB for user and session records",
        ],
        highlights: [
          "Extension, database, and dashboard all built in one weekend",
          "Presented to the judges in JumboHack's Education track",
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
        overview: "A lossy image compressor and decompressor written in C for Tufts' CS40: Machine Structure and Assembly Language Programming. It packs a raster image into a compact binary format and reconstructs it with a small, controlled loss in quality, using the same ideas as JPEG.",
        role: "Co-written with a lab partner. I was responsible for the color space conversion and quantization stages.",
        built: [
          "C with manual memory management",
          "RGB converted to a luminance/chroma representation, so compression falls on the channels the eye notices least",
          "Discrete cosine transform over 2x2 pixel blocks",
          "Quantization of the transform coefficients, which is where the loss happens",
          "Bitpacking into fixed-size codewords behind a minimal header",
          "A decompressor that reverses each step",
        ],
        highlights: [
          "No image-processing libraries: every stage is implemented from the assignment specification",
          "Taught me how formats like JPEG work underneath",
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
      image: theatre,
      source_code_link: "https://github.com/JumboCode/theatre-at-first",
      noDemo: true,
      details: {
        overview: "A costume and prop inventory system for Theatre@First, a community theater in Somerville, MA. Staff browse, check out, and track items across productions instead of relying on paper and spreadsheets.",
        role: "Full-stack developer on a 10-person JumboCode team under tech leads Liam Strand and Amitav Nott, completing weekly tickets across the front end and back end.",
        built: [
          "Next.js 13 App Router with TypeScript",
          "Clerk for authentication",
          "Drizzle ORM over a PostgreSQL database on Neon",
          "Tailwind CSS for a responsive UI",
          "Screens implemented from the team designers' Figma files",
        ],
        highlights: [
          "Built for a real theater and its catalog of props and costumes",
          "My first team project in TypeScript",
          "Learned to work in a shared codebase with 10 contributors: pull requests, reviews, and merge conflicts",
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
        overview: "My first portfolio: a responsive single-page site built with React and Vite. It is where I learned component structure, hooks, and how to deploy.",
        role: "Solo project. I designed, built, and deployed it.",
        built: [
          "React 18 with function components and hooks",
          "Vite for the build",
          "Plain CSS, with no utility framework",
          "Hash anchors for navigation between sections",
          "Deployed on Vercel",
        ],
        highlights: [
          "My first project taken from an empty repo to a live URL",
          "Led directly to this portfolio and to experimenting with Three.js",
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
        overview: "A word-search tool modeled on Unix grep, written in C++ for Tufts' CS15 Data Structures course. gerp indexes every file under a directory, then answers case-sensitive or case-insensitive queries with each matching line.",
        role: "Co-written with a partner. I was responsible for the hash table, the directory traversal, and query normalization.",
        built: [
          "C++ with std::vector, std::list, and file streams",
          "Our own chained hash table mapping each word to the files and lines where it appears, for average constant-time lookup",
          "Recursive traversal of the directory tree to build the index",
          "Queries stripped of leading and trailing non-alphanumeric characters before lookup",
          "Results written to an output file that can be switched mid-session",
        ],
        highlights: [
          "No std::unordered_map: the hash table is our own",
          "Memory managed by hand and checked for leaks with Valgrind",
          "Taught me how search tools index text",
        ],
      },
    },
  ];

  export { technologies, experiences, projects };
