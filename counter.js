(() => {
    const counters = Array.from(document.querySelectorAll(".count-up[data-count]"));
    if (counters.length === 0) return;

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animationFrames = new WeakMap();

    const resetCounter = (element) => {
        const suffix = element.dataset.suffix || "";
        element.textContent = `0${suffix}`;
    };

    const animateCounter = (element) => {
        const target = Number(element.dataset.count);
        const suffix = element.dataset.suffix || "";
        const duration = Number(element.dataset.duration) || 2600;

        if (!Number.isFinite(target)) return;

        const existingFrame = animationFrames.get(element);
        if (existingFrame) {
            cancelAnimationFrame(existingFrame);
        }

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
                animationFrames.set(element, requestAnimationFrame(tick));
            } else {
                element.textContent = `${target}${suffix}`;
                animationFrames.delete(element);
            }
        };
        animationFrames.set(element, requestAnimationFrame(tick));
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                    } else {
                        resetCounter(entry.target);
                    }
                });
            },
            { threshold: 0.35 }
        );

        counters.forEach((counter) => {
            resetCounter(counter);
            observer.observe(counter);
        });
    } else {
        counters.forEach(animateCounter);
    }
})();
