(() => {
    const targets = document.querySelectorAll(
        [
            ".page-hero",
            ".hero-panel",
            ".section",
            ".section-sm",
            ".service-card",
            ".value-card",
            ".process-card",
            ".project-card",
            ".info-card",
            ".faq-card",
            ".surface-card",
            ".image-card",
            ".image-banner",
            ".stats-grid",
            ".cta-panel"
        ].join(",")
    );

    if (targets.length === 0) return;

    targets.forEach((el) => el.classList.add("reveal"));

    if (!("IntersectionObserver" in window)) {
        targets.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    targets.forEach((el) => observer.observe(el));
})();
