(() => {
  "use strict";

  /**
   * Project data
   * - Keep everything static + fast: no backend required.
   * - Add your real screenshots under /images and reference them if needed.
   */
  const PROJECTS = {
    analyzen: {
      title: "Fintech Product APIs (Analyzen)",
      kicker: "NGO • Fintech • Backend",
      subtitle: "RESTful APIs for KYC forms, loan products, and savings products with scalable, maintainable architecture.",
      coverImage: { src: "./images/projects/analyzen-cover.jpg", alt: "Fintech product APIs cover" },
      gallery: [
        { src: "./images/projects/analyzen-1.jpg", alt: "API documentation or module overview" },
        { src: "./images/projects/analyzen-2.jpg", alt: "Database schema or service flow" },
        { src: "./images/projects/analyzen-3.jpg", alt: "Deployment or environment overview" },
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
        "Dockerized environments for smooth transitions",
        "Collaboration with frontend teams (React integration)",
      ],
      highlights: ["Scalable architecture", "Database optimization", "Cloud deployment (AWS)"],
      next: "Add real screenshots (docs, diagrams, UI) into /images/projects and update this gallery.",
    },
    shurjopay: {
      title: "Shurjopay Payment Processor",
      kicker: "Fintech • Payments • APIs",
      subtitle: "Payment processor APIs with gateway integrations and a maintainable service-oriented codebase.",
      coverImage: { src: "./images/projects/shurjopay-cover.jpg", alt: "Shurjopay cover" },
      gallery: [
        { src: "./images/projects/shurjopay-1.jpg", alt: "Integration flow diagram" },
        { src: "./images/projects/shurjopay-2.jpg", alt: "API endpoints overview" },
        { src: "./images/projects/shurjopay-3.jpg", alt: "Admin or reporting view (if available)" },
      ],
      tags: ["Laravel", "Lumen", "MySQL", "API Integrations", "Git"],
      role: "Software Engineer (Shurjomukhi Ltd.)",
      timeline: "2022 – 2024",
      stack: "Laravel/Lumen, MySQL, Vue.js integration, Linux servers",
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
      next: "Add a short architecture diagram screenshot and a few UI/admin screenshots (if permitted).",
    },
    khanbakelite: {
      title: "Khanbakelite Project",
      kicker: "Full‑stack • Web app",
      subtitle: "System design, architecture, and implementation aligned with client workflows and business needs.",
      coverImage: { src: "./images/projects/khanbakelite-cover.jpg", alt: "Khanbakelite project cover" },
      gallery: [
        { src: "./images/projects/khanbakelite-1.jpg", alt: "Client flow or module list" },
        { src: "./images/projects/khanbakelite-2.jpg", alt: "UI screens built with Bootstrap" },
        { src: "./images/projects/khanbakelite-3.jpg", alt: "Database schema overview" },
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
      next: "Add screenshots of key screens (dashboard, forms, reports) into /images/projects.",
    },
  };

  const qs = (sel) => document.querySelector(sel);
  const el = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };

  const params = new URLSearchParams(window.location.search);
  const id = (params.get("id") || "").trim().toLowerCase();

  const project = PROJECTS[id];
  const missing = qs("#projectMissing");
  const view = qs("#projectView");

  if (!project) {
    missing?.classList.remove("d-none");
    view?.classList.add("d-none");
    document.title = "Project not found | Swapnil";
    return;
  }

  missing?.classList.add("d-none");
  view?.classList.remove("d-none");

  document.title = `${project.title} | Swapnil`;

  const setText = (sel, value) => {
    const node = qs(sel);
    if (node) node.textContent = value || "";
  };

  const setImage = (imgEl, img) => {
    if (!imgEl) return;
    if (!img || !img.src) {
      imgEl.closest?.(".project-hero")?.classList.add("d-none");
      return;
    }
    imgEl.src = img.src;
    imgEl.alt = img.alt || project.title || "Project image";
    imgEl.closest?.(".project-hero")?.classList.remove("d-none");
  };

  setText("#projectTitle", project.title);
  setText("#projectKicker", project.kicker || "Project details");
  setText("#projectSubtitle", project.subtitle || "");
  setText("#projectRole", project.role || "");
  setText("#projectTimeline", project.timeline || "");
  setText("#projectStack", project.stack || "");
  setText("#projectNext", project.next || "");

  setImage(qs("#projectCover"), project.coverImage);

  // Gallery (supports lots of images): render in chunks + lightbox carousel
  const galleryWrap = qs("#projectGallery");
  const loadMoreBtn = qs("#galleryLoadMore");
  const galleryCountEl = qs("#projectGalleryCount");

  const items = (Array.isArray(project.gallery) ? project.gallery : []).filter((i) => i?.src);
  if (galleryCountEl) galleryCountEl.textContent = items.length ? `${items.length} images` : "";

  const CHUNK = 9;
  let visible = 0;

  const renderNext = () => {
    if (!galleryWrap) return;
    const end = Math.min(items.length, visible + CHUNK);
    for (let idx = visible; idx < end; idx += 1) {
      const img = items[idx];
      const tile = el("button", "gallery-tile");
      tile.type = "button";
      tile.setAttribute("data-index", String(idx));
      tile.setAttribute("aria-label", `Open screenshot ${idx + 1} of ${items.length}`);

      const imageEl = el("img", "gallery-img");
      imageEl.src = img.src;
      imageEl.alt = img.alt || project.title || "Project screenshot";
      imageEl.loading = "lazy";
      imageEl.decoding = "async";

      tile.appendChild(imageEl);
      galleryWrap.appendChild(tile);
    }
    visible = end;
    if (loadMoreBtn) loadMoreBtn.classList.toggle("d-none", visible >= items.length);
  };

  if (galleryWrap) {
    galleryWrap.innerHTML = "";
    if (!items.length) galleryWrap.classList.add("d-none");
    else galleryWrap.classList.remove("d-none");
    visible = 0;
    renderNext();
  }

  loadMoreBtn?.addEventListener("click", renderNext);

  // Lightbox: Bootstrap carousel + thumbnails
  const modalEl = qs("#lightboxModal");
  const captionEl = qs("#lightboxCaption");
  const slidesEl = qs("#lightboxSlides");
  const thumbsEl = qs("#lightboxThumbs");
  const carouselEl = qs("#lightboxCarousel");

  const setActiveThumb = (activeIdx) => {
    if (!thumbsEl) return;
    const all = thumbsEl.querySelectorAll("button.lightbox-thumb");
    all.forEach((b) => b.classList.toggle("active", b.getAttribute("data-index") === String(activeIdx)));
    const active = thumbsEl.querySelector(`button.lightbox-thumb[data-index="${activeIdx}"]`);
    active?.scrollIntoView?.({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  if (modalEl && slidesEl && carouselEl && items.length) {
    const modal = window.bootstrap?.Modal?.getOrCreateInstance(modalEl, { focus: true });
    const carousel = window.bootstrap?.Carousel?.getOrCreateInstance(carouselEl, { interval: false, ride: false, wrap: true });

    // Build slides + thumbs once
    slidesEl.innerHTML = "";
    thumbsEl && (thumbsEl.innerHTML = "");
    items.forEach((img, idx) => {
      const slide = el("div", `carousel-item${idx === 0 ? " active" : ""}`);
      const slideImg = el("img", "lightbox-slide-img");
      slideImg.src = img.src;
      slideImg.alt = img.alt || project.title || "Project screenshot";
      slideImg.loading = "eager";
      slideImg.decoding = "async";
      slide.appendChild(slideImg);
      slidesEl.appendChild(slide);

      if (thumbsEl) {
        const t = el("button", `lightbox-thumb${idx === 0 ? " active" : ""}`);
        t.type = "button";
        t.setAttribute("data-index", String(idx));
        t.setAttribute("aria-label", `Go to image ${idx + 1}`);
        const ti = el("img");
        ti.src = img.src;
        ti.alt = img.alt || "";
        ti.loading = "lazy";
        ti.decoding = "async";
        t.appendChild(ti);
        thumbsEl.appendChild(t);
      }
    });

    const openAt = (idx) => {
      const safe = Math.max(0, Math.min(items.length - 1, Number(idx)));
      carousel.to(safe);
      const alt = items[safe]?.alt || project.title || "Project image";
      if (captionEl) captionEl.textContent = alt;
      setActiveThumb(safe);
      modal.show();
    };

    galleryWrap?.addEventListener("click", (e) => {
      const btn = e.target.closest?.("button.gallery-tile[data-index]");
      if (!btn) return;
      openAt(Number(btn.getAttribute("data-index")));
    });

    thumbsEl?.addEventListener("click", (e) => {
      const btn = e.target.closest?.("button.lightbox-thumb[data-index]");
      if (!btn) return;
      openAt(Number(btn.getAttribute("data-index")));
    });

    carouselEl.addEventListener("slid.bs.carousel", () => {
      const activeSlide = slidesEl.querySelector(".carousel-item.active");
      const allSlides = Array.from(slidesEl.querySelectorAll(".carousel-item"));
      const idx = Math.max(0, allSlides.indexOf(activeSlide));
      const alt = items[idx]?.alt || project.title || "Project image";
      if (captionEl) captionEl.textContent = alt;
      setActiveThumb(idx);
    });
  }

  const tagsWrap = qs("#projectTags");
  if (tagsWrap) {
    tagsWrap.innerHTML = "";
    (project.tags || []).forEach((t) => {
      const chip = el("span", "tag");
      chip.textContent = t;
      tagsWrap.appendChild(chip);
    });
  }

  const linksWrap = qs("#projectLinks");
  if (linksWrap) {
    linksWrap.innerHTML = "";
    (project.links || []).forEach((l) => {
      const kind = l.kind === "primary" ? "btn btn-primary" : "btn btn-outline-light";
      const a = el("a", `${kind} btn-sm`);
      a.href = l.href || "#";
      a.textContent = l.label || "Link";
      linksWrap.appendChild(a);
    });
  }

  const overviewWrap = qs("#projectOverview");
  if (overviewWrap) {
    overviewWrap.innerHTML = "";
    (project.overview || []).forEach((p) => {
      const para = el("p", "mb-2");
      para.textContent = p;
      overviewWrap.appendChild(para);
    });
  }

  const featuresWrap = qs("#projectFeatures");
  if (featuresWrap) {
    featuresWrap.innerHTML = "";
    (project.features || []).forEach((f) => {
      const li = el("li");
      li.textContent = f;
      featuresWrap.appendChild(li);
    });
  }

  const highlightsWrap = qs("#projectHighlights");
  if (highlightsWrap) {
    highlightsWrap.innerHTML = "";
    (project.highlights || []).forEach((h) => {
      const row = el("div", "d-flex gap-2 align-items-start");
      const icon = el("span", "text-primary");
      icon.innerHTML = '<i class="bi bi-check2-circle" aria-hidden="true"></i>';
      const text = el("div", "text-secondary-emphasis");
      text.textContent = h;
      row.appendChild(icon);
      row.appendChild(text);
      highlightsWrap.appendChild(row);
    });
  }
})();

