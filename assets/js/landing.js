/**
 * Mileda Tech landing — scroll reveals y navegación
 */
(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.body.classList.add("is-loaded");

  const revealSelectors = [
    ".reveal",
    ".pullquote",
    ".solution__card",
    ".site-footer__rule",
  ];

  const navLinks = document.querySelectorAll(".movement-nav__link");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveSection = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
    document.body.classList.toggle("is-cta-active", id === "mov-cta");
  };

  if (sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
    setActiveSection(sections[0].id);
  }

  if (prefersReducedMotion) {
    revealSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => el.classList.add("is-visible"));
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
  );

  revealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => observer.observe(el));
  });
})();
