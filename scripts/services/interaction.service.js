import audioService
from "./audio.service.js";

let cursor =
    null;

let cursorVisible =
    false;

let rafId =
    0;

const position = {
    currentX: 0,
    currentY: 0,

    targetX: 0,
    targetY: 0
};

const lerp = (
    start,
    end,
    alpha
) => {
    return (
        start +
        (
            end -
            start
        ) * alpha
    );
};

const render = () => {
    position.currentX =
        lerp(
            position.currentX,
            position.targetX,
            0.18
        );

    position.currentY =
        lerp(
            position.currentY,
            position.targetY,
            0.18
        );

    cursor.style.transform =
        `translate3d(${position.currentX}px, ${position.currentY}px, 0)`;

    rafId =
        requestAnimationFrame(
            render
        );
};

const createRipple = (
    x,
    y
) => {
    const ripple =
        document.createElement(
            "div"
        );

    ripple.className =
        "cursor-ripple";

    ripple.style.left =
        `${x}px`;

    ripple.style.top =
        `${y}px`;

    document.body.append(
        ripple
    );

    ripple.addEventListener(
        "animationend",
        () => {
            ripple.remove();
        },
        {
            once: true
        }
    );
};

const handlePointerMove = (
    event
) => {
    position.targetX =
        event.clientX;

    position.targetY =
        event.clientY;

    if (!cursorVisible) {
        cursorVisible = true;

        cursor.classList.remove(
            "custom-cursor-hidden"
        );
    }

    const interactive =
        event.target.closest(
            [
                "button",
                "a",
                ".button",
                ".product-card"
            ].join(",")
        );

    cursor.classList.toggle(
        "custom-cursor-active",
        Boolean(interactive)
    );
};

const handlePointerLeave = () => {
    cursorVisible = false;

    cursor.classList.add(
        "custom-cursor-hidden"
    );
};

const initializeMagnetic = () => {
    const buttons =
        document.querySelectorAll(
            ".button-magnetic"
        );

    for (
        const button
        of buttons
    ) {
        button.addEventListener(
            "mousemove",
            (
                event
            ) => {
                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.setProperty(
                    "--button-x",
                    `${x * 0.16}px`
                );

                button.style.setProperty(
                    "--button-y",
                    `${y * 0.16}px`
                );
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {
                button.style.setProperty(
                    "--button-x",
                    "0px"
                );

                button.style.setProperty(
                    "--button-y",
                    "0px"
                );
            }
        );
    }
};

const initialize = () => {
    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {
        return;
    }

    cursor =
        document.createElement(
            "div"
        );

    cursor.className =
        "custom-cursor custom-cursor-hidden";

    document.body.append(
        cursor
    );

    document.addEventListener(
        "pointermove",
        handlePointerMove,
        {
            passive: true
        }
    );

    document.addEventListener(
        "pointerleave",
        handlePointerLeave
    );

    document.addEventListener(
        "pointerdown",
        (
            event
        ) => {
            createRipple(
                event.clientX,
                event.clientY
            );

            audioService.play(
                "click"
            );
        }
    );

    initializeMagnetic();

    render();
};

const destroy = () => {
    cancelAnimationFrame(
        rafId
    );

    cursor?.remove();
};

export default Object.freeze({
    initialize,
    destroy
}); 
