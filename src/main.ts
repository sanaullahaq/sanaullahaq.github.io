// Sanaulla Haq — portfolio site interactions
// Compiled to ../script.js via `npx tsc`. Keep this the single source of truth;
// edit this file, then recompile — do not hand-edit script.js.

(function (): void {
  "use strict";

  /** Set the copyright year automatically. */
  function setYear(): void {
    const el = document.getElementById("year");
    if (el) {
      el.textContent = String(new Date().getFullYear());
    }
  }

  /** Reveal .reveal elements as they scroll into view. */
  function initScrollReveal(): void {
    const targets: NodeListOf<Element> = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window) || targets.length === 0) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /** Highlight the active nav route based on scroll position. */
  function initActiveRoute(): void {
    const sections: HTMLElement[] = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]")
    );
    const links: HTMLAnchorElement[] = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav.routes a")
    );

    if (sections.length === 0 || links.length === 0) return;

    const linkByHash = new Map<string, HTMLAnchorElement>();
    links.forEach((link) => {
      linkByHash.set(link.getAttribute("href") || "", link);
    });

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const id = (entry.target as HTMLElement).id;
          const link = linkByHash.get(`#${id}`);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((l) => l.removeAttribute("aria-current"));
            link.setAttribute("aria-current", "page");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /** Show/hide the back-to-top button based on scroll depth. */
  function initBackToTop(): void {
    const btn = document.getElementById("toTop");
    if (!btn) return;

    const toggle = (): void => {
      if (window.scrollY > 560) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    toggle();
  }

  function init(): void {
    setYear();
    initScrollReveal();
    initActiveRoute();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
