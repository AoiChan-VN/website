let observer =
    null;

const loadImage = (
    image
) => {
    const source =
        image.dataset.src;

    if (!source) {
        return;
    }

    image.src =
        source;

    image.removeAttribute(
        "data-src"
    );

    image.classList.add(
        "lazy-loaded"
    );
};

const initializeObserver = () => {
    observer =
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

                    loadImage(
                        entry.target
                    );

                    observer.unobserve(
                        entry.target
                    );
                }
            },
            {
                rootMargin:
                    "120px 0px"
            }
        );
};

const initialize = () => {
    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {
        return;
    }

    initializeObserver();

    const lazyImages =
        document.querySelectorAll(
            "img[data-src]"
        );

    for (
        const image
        of lazyImages
    ) {
        observer.observe(
            image
        );
    }
};

const destroy = () => {
    observer?.disconnect();
};

export default Object.freeze({
    initialize,
    destroy
}); 
