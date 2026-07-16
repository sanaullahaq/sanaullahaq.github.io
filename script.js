"use strict";
(function () {
    "use strict";
    function setYear() {
        const el = document.getElementById("year");
        if (el) {
            el.textContent = String(new Date().getFullYear());
        }
    }
    function initScrollReveal() {
        const targets = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window) || targets.length === 0) {
            targets.forEach((el) => el.classList.add("in"));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        targets.forEach((el) => observer.observe(el));
    }
    function initActiveRoute() {
        const sections = Array.from(document.querySelectorAll("main section[id]"));
        const links = Array.from(document.querySelectorAll("nav.routes a"));
        if (sections.length === 0 || links.length === 0)
            return;
        const linkByHash = new Map();
        links.forEach((link) => {
            linkByHash.set(link.getAttribute("href") || "", link);
        });
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.id;
                const link = linkByHash.get(`#${id}`);
                if (!link)
                    return;
                if (entry.isIntersecting) {
                    links.forEach((l) => l.removeAttribute("aria-current"));
                    link.setAttribute("aria-current", "page");
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
        sections.forEach((section) => observer.observe(section));
    }
    function initBackToTop() {
        const btn = document.getElementById("toTop");
        if (!btn)
            return;
        const toggle = () => {
            if (window.scrollY > 560) {
                btn.classList.add("show");
            }
            else {
                btn.classList.remove("show");
            }
        };
        window.addEventListener("scroll", toggle, { passive: true });
        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        toggle();
    }
    function init() {
        setYear();
        initScrollReveal();
        initActiveRoute();
        initBackToTop();
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    }
    else {
        init();
    }
})();
