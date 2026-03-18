(() => {
    const counters = Array.from(document.querySelectorAll(".count-up[data-count]"));
    if (counters.length === 0) return;

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateCounter = (element) => {
        if (element.dataset.animated === "true") return;
        element.dataset.animated = "true";

        const target = Number(element.dataset.count);
        const suffix = element.dataset.suffix || "";
        const duration = Number(element.dataset.duration) || 1600;

        if (!Number.isFinite(target)) return;

        if (prefersReducedMotion || duration <= 0) {
            element.textContent = `${target}${suffix}`;
            return;
        }

        const startTime = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            element.textContent = `${value}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                element.textContent = `${target}${suffix}`;
            }
        };
        requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        counters.forEach((counter) => observer.observe(counter));
    } else {
        counters.forEach(animateCounter);
    }
})();
