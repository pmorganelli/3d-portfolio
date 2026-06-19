# Peter Morganelli's 3D Developer Portfolio

An immersive, interactive 3D portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Three.js** to showcase my projects, skills, and technical experience in a visually compelling way.

<img width="2398" height="1596" alt="image" src="https://github.com/user-attachments/assets/3c0637dc-cfc3-4ed4-9dde-ecc09f66b8ae" />

---

## Live Demo
 [petermorganelli.dev](https://www.petermorganelli.dev)

---

## Tech Stack

| Technology       | Purpose                                                   |
|------------------|-----------------------------------------------------------|
| **React**        | Component-based UI development                            |
| **Vite**         | Fast build & dev server                                   |
| **Tailwind CSS** | Utility-first responsive styling                          |
| **Three.js**     | 3D rendering & animations                                 |
| **React Three Fiber** | React renderer for Three.js                       |
| **Framer Motion**| Smooth animations & transitions                          |
| **JavaScript (ES6+)** | Core logic and interactivity                        |

---

## Features

-  **Interactive 3D Models** – Users can explore projects in a fully interactive 3D space.
-  **Responsive Design** – Optimized for mobile, tablet, and desktop screens.
-  **Lightning-Fast Loading** – Powered by Vite for near-instant load times.
-  **Smooth Animations** – Framer Motion for fluid transitions and hover effects.
-  **Modular Architecture** – Clean, maintainable, and scalable codebase.
-  **Contact Form** – Direct messaging through the portfolio.

---

## Project Structure

```plaintext
3d-portfolio/
├── public/               # Static assets
├── src/
│   ├── assets/            # Images, 3D models, textures
│   ├── components/        # Reusable UI components
│   ├── components/        # Portfolio sections, canvas scenes, and UI components
│   ├── constants/         # Portfolio content and project data
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── package.json
├── tailwind.config.js
└── vite.config.js

```

## Installation and Setup
# 1. Clone the repository

git clone https://github.com/pmorganelli/3d-portfolio.git

# 2. Navigate into the project
cd 3d-portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open in browser
# Visit http://localhost:5173


## Contact Form Environment

The contact form sends mail through EmailJS and requires these Vite client environment variables locally and in production hosting:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Create a local `.env` from `.env.example` for development. In production, add the same `VITE_EMAILJS_*` variables in the hosting provider's environment settings before building/deploying. If any are missing, the form shows a user-facing configuration error instead of failing silently.

## License
This project is registered under the MIT license.

📬 Contact
💼 Peter Morganelli
📧 peter.morganelli@tufts.edu
🔗 [LinkedIn]([url](https://www.linkedin.com/in/petermorganelli)) | [GitHub]([url](https://github.com/pmorganelli))


