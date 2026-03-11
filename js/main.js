/* eslint-disable no-unused-vars */
(() => {
  "use strict";

  // Smooth scrolling for internal links + collapse navbar on click (mobile)
  const navCollapseEl = document.getElementById("navLinks");
  const toTopBtn = document.getElementById("toTop");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const hash = a.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Close navbar after navigation on small screens
    const bsCollapse = window.bootstrap?.Collapse?.getOrCreateInstance(navCollapseEl, { toggle: false });
    if (bsCollapse && navCollapseEl?.classList.contains("show")) bsCollapse.hide();
  });

  // Reveal-on-scroll animations (IntersectionObserver)
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Animate progress bars when visible
  const progressBars = Array.from(document.querySelectorAll(".progress-bar[data-progress]"));
  if (!prefersReducedMotion && "IntersectionObserver" in window && progressBars.length) {
    const pbObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const bar = entry.target;
          const targetPct = Number(bar.getAttribute("data-progress") || "0");
          bar.style.width = `${Math.max(0, Math.min(100, targetPct))}%`;
          pbObserver.unobserve(bar);
        }
      },
      { threshold: 0.35 }
    );
    progressBars.forEach((bar) => pbObserver.observe(bar));
  } else {
    progressBars.forEach((bar) => {
      const targetPct = Number(bar.getAttribute("data-progress") || "0");
      bar.style.width = `${Math.max(0, Math.min(100, targetPct))}%`;
    });
  }

  // "Back to top" button
  const toggleToTop = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (!toTopBtn) return;
    toTopBtn.classList.toggle("show", y > 700);
  };
  window.addEventListener("scroll", toggleToTop, { passive: true });
  toggleToTop();

  // Navbar subtle "scrolled" style
  const nav = document.getElementById("mainNav");
  const toggleNav = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav?.classList.toggle("scrolled", y > 12);
  };
  window.addEventListener("scroll", toggleNav, { passive: true });
  toggleNav();

  toTopBtn?.addEventListener("click", () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Lightweight "typed" effect (no external dependency)
  const typedTarget = document.getElementById("typedTarget");
  const typedPhrasesRaw = typedTarget?.getAttribute("data-typed");
  let phrases = [];
  try {
    phrases = typedPhrasesRaw ? JSON.parse(typedPhrasesRaw) : [];
  } catch {
    phrases = [];
  }

  if (!prefersReducedMotion && typedTarget && Array.isArray(phrases) && phrases.length) {
    const base = typedTarget.textContent?.trim() || "";
    const all = [base, ...phrases.filter((p) => typeof p === "string" && p.trim())];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const current = all[phraseIdx] || "";
      const nextText = deleting ? current.slice(0, Math.max(0, charIdx - 1)) : current.slice(0, charIdx + 1);
      typedTarget.textContent = nextText;

      if (!deleting) {
        charIdx += 1;
        if (charIdx >= current.length) {
          deleting = true;
          window.setTimeout(tick, 1100);
          return;
        }
      } else {
        charIdx -= 1;
        if (charIdx <= 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % all.length;
        }
      }

      const delay = deleting ? 35 : 55;
      window.setTimeout(tick, delay);
    };

    // Start after initial paint
    window.setTimeout(tick, 500);
  }

  // Contact form client-side validation + toast
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isValid = contactForm.checkValidity();
        contactForm.classList.add("was-validated");

        if (!isValid) return;

        const toastAnchor = document.getElementById("formToastAnchor");
        if (!toastAnchor) return;

        const toastEl = document.createElement("div");
        toastEl.className = "toast align-items-center text-bg-success border-0 show";
        toastEl.setAttribute("role", "status");
        toastEl.setAttribute("aria-live", "polite");
        toastEl.setAttribute("aria-atomic", "true");
        toastEl.innerHTML = `
          <div class="d-flex">
            <div class="toast-body">
              Message prepared. Hook this form to your backend or form provider.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
          </div>
        `;

        toastAnchor.innerHTML = "";
        toastAnchor.appendChild(toastEl);

        toastEl.querySelector("button")?.addEventListener("click", () => toastEl.remove());
        window.setTimeout(() => toastEl.remove(), 4500);

        contactForm.reset();
        contactForm.classList.remove("was-validated");
      },
      false
    );
  }
})();

