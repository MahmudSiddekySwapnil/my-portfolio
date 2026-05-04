/**
 * projects-data.js
 * ─────────────────────────────────────────────────────
 * Pure project data — no DOM logic here.
 * Edit this file to add / update / remove projects.
 *
 * Each project key matches the `?id=` URL param used
 * in project.html (e.g. project.html?id=analyzen).
 *
 * HOW TO ADD A NEW PROJECT
 * ─────────────────────────
 * 1. Add a new key below (e.g. "myproject": { ... })
 * 2. Add a card in index.html under #projects section
 *    with href="./project.html?id=myproject"
 * 3. Drop screenshots into /images/projects/myproject/
 *    and update the coverImage / gallery paths below.
 */

/* global window */
window.PORTFOLIO_PROJECTS = {
  analyzen: {
    title: "Fintech Product APIs (Analyzen)",
    kicker: "NGO • Fintech • Backend",
    subtitle:
      "RESTful APIs for KYC forms, loan products, and savings products with scalable, maintainable architecture.",
    coverImage: {
      src: "./images/projects/analyzen/cover.jpg",
      alt: "Fintech product APIs cover",
    },
    gallery: [
      { src: "./images/projects/analyzen/1.jpg", alt: "API documentation or module overview" },
      { src: "./images/projects/analyzen/2.jpg", alt: "Database schema or service flow" },
      { src: "./images/projects/analyzen/3.jpg", alt: "Deployment or environment overview" },
    ],
    tags: ["PHP", "Laravel", "MySQL", "AWS", "Docker"],
    role: "Software Engineer",
    timeline: "2024 – Present",
    stack: "Laravel, MySQL, AWS, Docker, Linux",
    links: [{ label: "Back to portfolio", href: "./index.html#projects", kind: "secondary" }],
    overview: [
      "Developed RESTful APIs for backend features including KYC forms, loan products, and savings products.",
      "Designed and optimized MySQL databases to ensure data integrity and efficient storage/retrieval for large-scale apps.",
      "Used AWS for cloud deployment and scalability; Dockerized services for consistent dev/test/prod environments.",
    ],
    features: [
      "RESTful API design with validation and consistent responses",
      "Repository & Service patterns for maintainable code",
      "Dockerized environments for smooth dev/test/prod transitions",
      "Collaboration with frontend teams (React integration)",
    ],
    highlights: ["Scalable architecture", "Database optimization", "Cloud deployment (AWS)"],
    next: "Add real screenshots (docs, diagrams, UI) into /images/projects/analyzen/ and update the gallery paths above.",
  },

  shurjopay: {
    title: "Shurjopay Payment Processor",
    kicker: "Fintech • Payments • APIs",
    subtitle:
      "Payment processor APIs with gateway integrations and a maintainable service-oriented codebase.",
    coverImage: {
      src: "./images/projects/shurjopay/cover.jpg",
      alt: "Shurjopay cover",
    },
    gallery: [
      { src: "./images/projects/shurjopay/1.jpg", alt: "Integration flow diagram" },
      { src: "./images/projects/shurjopay/2.jpg", alt: "API endpoints overview" },
      { src: "./images/projects/shurjopay/3.jpg", alt: "Admin or reporting view" },
    ],
    tags: ["Laravel", "Lumen", "MySQL", "API Integrations", "Git"],
    role: "Software Engineer (Shurjomukhi Ltd.)",
    timeline: "2022 – 2024",
    stack: "Laravel/Lumen, MySQL, Linux servers",
    links: [{ label: "Back to portfolio", href: "./index.html#projects", kind: "secondary" }],
    overview: [
      "Developed RESTful APIs using Laravel and Lumen for the Shurjopay payment processor.",
      "Integrated multiple APIs/gateways including bKash, Pathao Pay, MTBL, and DBBL.",
      "Refactored and reviewed code to improve quality, maintainability, and testability.",
    ],
    features: [
      "Gateway integrations (bKash, Pathao Pay, MTBL, DBBL, etc.)",
      "Repository & Service patterns",
      "Database optimization for integrity and performance",
      "Server stability and deployment support",
    ],
    highlights: ["Payment integrations", "Scalable patterns", "Code quality via reviews/refactoring"],
    next: "Add a short architecture diagram screenshot and a few UI/admin screenshots into /images/projects/shurjopay/.",
  },

  khanbakelite: {
    title: "Khanbakelite Project",
    kicker: "Full-stack • Web app",
    subtitle:
      "System design, architecture, and implementation aligned with client workflows and business needs.",
    coverImage: {
      src: "./images/projects/khanbakelite/cover.jpg",
      alt: "Khanbakelite project cover",
    },
    gallery: [
      { src: "./images/projects/khanbakelite/1.jpg", alt: "Client flow or module list" },
      { src: "./images/projects/khanbakelite/2.jpg", alt: "UI screens built with Bootstrap" },
      { src: "./images/projects/khanbakelite/3.jpg", alt: "Database schema overview" },
    ],
    tags: ["Laravel", "Bootstrap", "AJAX", "jQuery", "MySQL"],
    role: "Software Engineer",
    timeline: "2021",
    stack: "Laravel, Bootstrap, AJAX/jQuery, MySQL",
    links: [{ label: "Back to portfolio", href: "./index.html#projects", kind: "secondary" }],
    overview: [
      "Gathered requirements, designed flow, components, and database schema aligned with client needs.",
      "Built the system using Laravel (backend), Bootstrap (responsive UI), AJAX/jQuery/JS (dynamic updates), and MySQL.",
      "Deployed on the designated server and presented the complete solution to the client.",
    ],
    features: [
      "Requirements gathering and system design",
      "Responsive front-end with Bootstrap",
      "Dynamic updates using AJAX/jQuery",
      "Deployment and environment setup",
    ],
    highlights: ["Client-aligned delivery", "Full-cycle development", "Production deployment"],
    next: "Add screenshots of key screens (dashboard, forms, reports) into /images/projects/khanbakelite/.",
  },
};
