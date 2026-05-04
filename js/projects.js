/**
 * projects.js  —  Project detail page renderer
 * ─────────────────────────────────────────────────────
 * Reads project data from window.PORTFOLIO_PROJECTS
 * (defined in js/data/projects-data.js).
 * This file contains ONLY rendering / DOM logic.
 */
(() => {
  "use strict";

  /* ── Helpers ── */
  const qs  = (sel) => document.querySelector(sel);
  const el  = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };

  /* ── Resolve data ── */
  const PROJECTS = window.PORTFOLIO_PROJECTS || {};
  const params   = new URLSearchParams(window.location.search);
  const id       = (params.get("id") || "").trim().toLowerCase();
  const project  = PROJECTS[id];

  const missing  = qs("#projectMissing");
  const view     = qs("#projectView");

  if (!project) {
    missing?.classList.remove("d-none");
    view?.classList.add("d-none");
    document.title = "Project not found | Swapnil";
    return;
  }

  missing?.classList.add("d-none");
  view?.classList.remove("d-none");
  document.title = `${project.title} | Swapnil`;

  /* ── Simple text setters ── */
  const setText = (sel, value) => {
    const node = qs(sel);
    if (node) node.textContent = value || "";
  };

  setText("#projectTitle",    project.title);
  setText("#projectKicker",   project.kicker    || "Project details");
  setText("#projectSubtitle", project.subtitle  || "");
  setText("#projectRole",     project.role      || "");
  setText("#projectTimeline", project.timeline  || "");
  setText("#projectStack",    project.stack     || "");
  setText("#projectNext",     project.next      || "");

  /* ── Cover image ── */
  const coverImg = qs("#projectCover");
  if (coverImg) {
    const img = project.coverImage;
    if (!img?.src) {
      coverImg.closest?.(".project-hero")?.classList.add("d-none");
    } else {
      coverImg.src = img.src;
      coverImg.alt = img.alt || project.title;
      coverImg.closest?.(".project-hero")?.classList.remove("d-none");
    }
  }

  /* ── Tags ── */
  const tagsWrap = qs("#projectTags");
  if (tagsWrap) {
    tagsWrap.innerHTML = "";
    (project.tags || []).forEach((t) => {
      const chip = el("span", "tag");
      chip.textContent = t;
      tagsWrap.appendChild(chip);
    });
  }

  /* ── Links ── */
  const linksWrap = qs("#projectLinks");
  if (linksWrap) {
    linksWrap.innerHTML = "";
    (project.links || []).forEach((l) => {
      const cls = l.kind === "primary" ? "btn btn-primary" : "btn btn-outline-light";
      const a = el("a", `${cls} btn-sm`);
      a.href = l.href || "#";
      a.textContent = l.label || "Link";
      linksWrap.appendChild(a);
    });
  }

  /* ── Overview paragraphs ── */
  const overviewWrap = qs("#projectOverview");
  if (overviewWrap) {
    overviewWrap.innerHTML = "";
    (project.overview || []).forEach((p) => {
      const para = el("p", "mb-2");
      para.textContent = p;
      overviewWrap.appendChild(para);
    });
  }

  /* ── Feature list ── */
  const featuresWrap = qs("#projectFeatures");
  if (featuresWrap) {
    featuresWrap.innerHTML = "";
    (project.features || []).forEach((f) => {
      const li = el("li");
      li.textContent = f;
      featuresWrap.appendChild(li);
    });
  }

  /* ── Highlights ── */
  const highlightsWrap = qs("#projectHighlights");
  if (highlightsWrap) {
    highlightsWrap.innerHTML = "";
    (project.highlights || []).forEach((h) => {
      const row  = el("div", "d-flex gap-2 align-items-start");
      const icon = el("span", "text-primary");
      icon.innerHTML = '<i class="bi bi-check2-circle" aria-hidden="true"></i>';
      const text = el("div", "text-secondary-emphasis");
      text.textContent = h;
      row.appendChild(icon);
      row.appendChild(text);
      highlightsWrap.appendChild(row);
    });
  }

  /* ── Gallery with lazy load-more ── */
  const galleryWrap    = qs("#projectGallery");
  const loadMoreBtn    = qs("#galleryLoadMore");
  const galleryCountEl = qs("#projectGalleryCount");

  const items = (Array.isArray(project.gallery) ? project.gallery : []).filter((i) => i?.src);
  if (galleryCountEl) galleryCountEl.textContent = items.length ? `${items.length} images` : "";

  const CHUNK = 9;
  let visible = 0;

  const renderNext = () => {
    if (!galleryWrap) return;
    const end = Math.min(items.length, visible + CHUNK);
    for (let idx = visible; idx < end; idx += 1) {
      const img  = items[idx];
      const tile = el("button", "gallery-tile");
      tile.type  = "button";
      tile.setAttribute("data-index", String(idx));
      tile.setAttribute("aria-label", `Open screenshot ${idx + 1} of ${items.length}`);

      const imageEl     = el("img", "gallery-img");
      imageEl.src       = img.src;
      imageEl.alt       = img.alt || project.title;
      imageEl.loading   = "lazy";
      imageEl.decoding  = "async";

      tile.appendChild(imageEl);
      galleryWrap.appendChild(tile);
    }
    visible = end;
    if (loadMoreBtn) loadMoreBtn.classList.toggle("d-none", visible >= items.length);
  };

  if (galleryWrap) {
    galleryWrap.innerHTML = "";
    galleryWrap.classList.toggle("d-none", !items.length);
    renderNext();
  }
  loadMoreBtn?.addEventListener("click", renderNext);

  /* ── Lightbox (Bootstrap carousel + thumbnails) ── */
  const modalEl    = qs("#lightboxModal");
  const captionEl  = qs("#lightboxCaption");
  const slidesEl   = qs("#lightboxSlides");
  const thumbsEl   = qs("#lightboxThumbs");
  const carouselEl = qs("#lightboxCarousel");

  const setActiveThumb = (activeIdx) => {
    if (!thumbsEl) return;
    thumbsEl.querySelectorAll("button.lightbox-thumb").forEach((b) =>
      b.classList.toggle("active", b.getAttribute("data-index") === String(activeIdx))
    );
    thumbsEl
      .querySelector(`button.lightbox-thumb[data-index="${activeIdx}"]`)
      ?.scrollIntoView?.({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  if (modalEl && slidesEl && carouselEl && items.length) {
    const modal    = window.bootstrap?.Modal?.getOrCreateInstance(modalEl, { focus: true });
    const carousel = window.bootstrap?.Carousel?.getOrCreateInstance(carouselEl, { interval: false, ride: false, wrap: true });

    /* Build slides + thumbnails once */
    slidesEl.innerHTML = "";
    if (thumbsEl) thumbsEl.innerHTML = "";

    items.forEach((img, idx) => {
      const slide    = el("div", `carousel-item${idx === 0 ? " active" : ""}`);
      const slideImg = el("img", "lightbox-slide-img");
      slideImg.src     = img.src;
      slideImg.alt     = img.alt || project.title;
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
        ti.src = img.src; ti.alt = img.alt || ""; ti.loading = "lazy"; ti.decoding = "async";
        t.appendChild(ti);
        thumbsEl.appendChild(t);
      }
    });

    const openAt = (idx) => {
      const safe = Math.max(0, Math.min(items.length - 1, Number(idx)));
      carousel.to(safe);
      if (captionEl) captionEl.textContent = items[safe]?.alt || project.title;
      setActiveThumb(safe);
      modal.show();
    };

    galleryWrap?.addEventListener("click", (e) => {
      const btn = e.target.closest?.("button.gallery-tile[data-index]");
      if (btn) openAt(Number(btn.getAttribute("data-index")));
    });

    thumbsEl?.addEventListener("click", (e) => {
      const btn = e.target.closest?.("button.lightbox-thumb[data-index]");
      if (btn) openAt(Number(btn.getAttribute("data-index")));
    });

    carouselEl.addEventListener("slid.bs.carousel", () => {
      const allSlides  = Array.from(slidesEl.querySelectorAll(".carousel-item"));
      const activeSlide = slidesEl.querySelector(".carousel-item.active");
      const idx = Math.max(0, allSlides.indexOf(activeSlide));
      if (captionEl) captionEl.textContent = items[idx]?.alt || project.title;
      setActiveThumb(idx);
    });
  }
})();
