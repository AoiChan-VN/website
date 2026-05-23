let rafId =
    0;

let paused =
    false;

const parallaxItems =
    [];

const revealItems =
    [];

const clamp = (
    value,
    min,
    max
) => {
    return Math.min(
        Math.max(value, min),
        max
    );
};

const initializeReveal = () => {
    const elements =
        document.querySelectorAll(
            [
                ".product-card",
                ".content-surface",
                ".hero-content",
                ".footer-shell"
            ].join(",")
        );

    for (
        const element
        of elements
    ) {
        element.classList.add(
            "reveal-init"
        );

        revealItems.push(
            element
        );
    }

    const observer =
        new IntersectionObserver(
            (
                entries
            ) => {
                for (
                    const entry
                    of entries
                ) {
                    if (
                        !entry.isIntersecting
                    ) {
                        continue;
                    }

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }
            },
            {
                threshold: 0.12
            }
        );

    for (
        const item
        of revealItems
    ) {
        observer.observe(
            item
        );
    }
};

const initializeParallax = () => {
    const items =
        document.querySelectorAll(
            "[data-parallax]"
        );

    for (
        const item
        of items
    ) {
        parallaxItems.push(
            item
        );
    }
};

const renderParallax = () => {
    if (paused) {
        return;
    }

    const scrollY =
        window.scrollY;

    for (
        const item
        of parallaxItems
    ) {
        const speed =
            Number(
                item.dataset.parallaxSpeed
            ) || 0.12;

        const offset =
            clamp(
                scrollY * speed,
                -120,
                120
            );

        item.style.transform =
            `translate3d(0, ${offset}px, 0)`;
    }

    rafId =
        requestAnimationFrame(
            renderParallax
        );
};

const initializeFloating = () => {
    const elements =
        document.querySelectorAll(
            ".animate-float"
        );

    for (
        const element
        of elements
    ) {
        element.style.animationPlayState =
            "running";
    }
};

const initialize = () => {
    initializeReveal();

    initializeParallax();

    initializeFloating();

    renderParallax();
};

const pause = () => {
    paused = true;
};

const resume = () => {
    if (!paused) {
        return;
    }

    paused = false;

    renderParallax();
};

const destroy = () => {
    cancelAnimationFrame(
        rafId
    );
};

export default Object.freeze({
    initialize,
    pause,
    resume,
    destroy
}); 
