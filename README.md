# Portfolio — Developer README

## Project Structure

```
my-portfolio-main/
│
├── index.html                  ← Main one-page portfolio
├── project.html                ← Project detail template (uses ?id= param)
├── Profile.pdf                 ← Your CV (linked as "Download CV" in navbar)
│
├── css/
│   ├── style.css               ← MASTER: @imports all partials below
│   ├── base.css                ← Design tokens, resets, typography, utilities
│   ├── layout.css              ← Navbar, sections, footer, back-to-top
│   ├── components.css          ← Cards, chips, tags, forms, icon-btns
│   └── sections/
│       ├── hero.css            ← Hero section styles
│       ├── about.css           ← About photo glow effects
│       └── projects.css        ← Project cards, gallery, lightbox
│
├── js/
│   ├── data/
│   │   └── projects-data.js    ← ✏️ EDIT THIS to add/update projects
│   ├── main.js                 ← Core UX: scroll, reveal, typed, form, nav
│   └── projects.js             ← Project detail page renderer (DOM only)
│
└── images/
    ├── mahmud-siddeky.png      ← Profile photo (About section)
    ├── favicon.png             ← Browser tab icon
    ├── og-preview.png          ← Social sharing preview image (create this!)
    └── projects/
        ├── analyzen/           ← Drop screenshots here: cover.jpg, 1.jpg, 2.jpg ...
        ├── shurjopay/          ← Drop screenshots here
        └── khanbakelite/       ← Drop screenshots here
```

---

## Adding a New Project

### Step 1 — Add data in `js/data/projects-data.js`
```js
myproject: {
  title: "My Project Name",
  kicker: "Category • Type",
  subtitle: "Short one-liner description.",
  coverImage: { src: "./images/projects/myproject/cover.jpg", alt: "Cover" },
  gallery: [
    { src: "./images/projects/myproject/1.jpg", alt: "Screenshot 1" },
  ],
  tags: ["Laravel", "MySQL"],
  role: "Software Engineer",
  timeline: "2024",
  stack: "Laravel, MySQL",
  links: [{ label: "Back to portfolio", href: "./index.html#projects", kind: "secondary" }],
  overview: ["Paragraph one.", "Paragraph two."],
  features: ["Feature A", "Feature B"],
  highlights: ["Key result 1", "Key result 2"],
  next: "Add screenshots to /images/projects/myproject/",
},
```

### Step 2 — Add a card in `index.html` under `#projects`
Copy an existing `<article class="project-card ...">` block and update the title, description, tags, and `href="./project.html?id=myproject"`.

### Step 3 — Add screenshots
Create `images/projects/myproject/` and drop your images in.

---

## Connecting the Contact Form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form → copy your form endpoint URL
3. In `index.html`, change the `<form id="contactForm" ...>` to:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
   ```
4. Remove the toast JS in `main.js` (or keep it as a client-side "sending..." state)

---

## Updating Social / OG Preview

- Replace `https://mahmud-siddeky.dev/` with your actual live domain in `index.html` and `project.html`
- Create a `images/og-preview.png` (1200×630px) — a branded preview card for LinkedIn/WhatsApp sharing

---

## CSS — How to Edit Styles

| What you want to change | File to edit |
|-------------------------|--------------|
| Colors / fonts / spacing tokens | `css/base.css` (`:root` block) |
| Navbar, footer, section spacing | `css/layout.css` |
| Cards, buttons, forms, chips | `css/components.css` |
| Hero section | `css/sections/hero.css` |
| About photo | `css/sections/about.css` |
| Project cards & lightbox | `css/sections/projects.css` |

> **Never edit `css/style.css` directly** — it's just a list of `@import` statements.
