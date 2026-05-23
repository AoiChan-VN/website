const media = {
    mobile:
        window.matchMedia(
            "(max-width: 767px)"
        ),

    tablet:
        window.matchMedia(
            "(min-width: 768px) and (max-width: 1199px)"
        ),

    desktop:
        window.matchMedia(
            "(min-width: 1200px)"
        ),

    reducedMotion:
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        )
};

const root =
    document.documentElement;

const updateViewportHeight =
    () => {
        const height =
            window.innerHeight * 0.01;

        root.style.setProperty(
            "--vh",
            `${height}px`
        );
    };

const updateDeviceState =
    () => {
        root.dataset.mobile =
            String(
                media.mobile.matches
            );

        root.dataset.tablet =
            String(
                media.tablet.matches
            );

        root.dataset.desktop =
            String(
                media.desktop.matches
            );

        root.dataset.reducedMotion =
            String(
                media.reducedMotion.matches
            );
    };

const handleResize = () => {
    updateViewportHeight();

    updateDeviceState();
};

const initializeSafeArea = () => {
    root.style.setProperty(
        "--safe-top",
        "env(safe-area-inset-top)"
    );

    root.style.setProperty(
        "--safe-right",
        "env(safe-area-inset-right)"
    );

    root.style.setProperty(
        "--safe-bottom",
        "env(safe-area-inset-bottom)"
    );

    root.style.setProperty(
        "--safe-left",
        "env(safe-area-inset-left)"
    );
};

const initialize = () => {
    initializeSafeArea();

    handleResize();

    window.addEventListener(
        "resize",
        handleResize,
        {
            passive: true
        }
    );

    window.addEventListener(
        "orientationchange",
        handleResize,
        {
            passive: true
        }
    );

    media.mobile.addEventListener(
        "change",
        updateDeviceState
    );

    media.tablet.addEventListener(
        "change",
        updateDeviceState
    );

    media.desktop.addEventListener(
        "change",
        updateDeviceState
    );

    media.reducedMotion.addEventListener(
        "change",
        updateDeviceState
    );
};

const destroy = () => {
    window.removeEventListener(
        "resize",
        handleResize
    );

    window.removeEventListener(
        "orientationchange",
        handleResize
    );
};

export default Object.freeze({
    initialize,
    destroy
}); 
