// FILE: /aoichan-native/scripts/engines/animation-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

/* =========================
   ANIMATION ENGINE
========================= */

const animationEngine = {

    initialized: false,

    animations: new Map(),

    timelines: new Map(),

    frameId: null,

    running: false,

    cleanupTasks: []

};

/* =========================
   EASING
========================= */

const easing = {

    linear(t) {

        return t;

    },

    easeOutCubic(t) {

        return (
            1 - Math.pow(
                1 - t,
                3
            )
        );

    },

    easeInOutQuad(t) {

        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(
                -2 * t + 2,
                2
            ) / 2;

    },

    easeOutExpo(t) {

        return t === 1
            ? 1
            : 1 - Math.pow(
                2,
                -10 * t
            );

    }

};

/* =========================
   TIMESTAMP
========================= */

function now() {

    return performance.now();

}

/* =========================
   REGISTER ANIMATION
========================= */

function registerAnimation(
    id,
    config
) {

    if (!id || !config) {
        return;
    }

    animationEngine.animations.set(
        id,
        {

            id,

            start:
                now(),

            duration:
                config.duration || 1000,

            delay:
                config.delay || 0,

            easing:
                config.easing ||
                easing.easeOutCubic,

            update:
                config.update,

            complete:
                config.complete,

            loop:
                Boolean(config.loop),

            finished: false

        }
    );

}

/* =========================
   REMOVE ANIMATION
========================= */

function removeAnimation(
    id
) {

    animationEngine.animations.delete(
        id
    );

}

/* =========================
   PROGRESS
========================= */

function calculateProgress(
    animation,
    timestamp
) {

    const elapsed =
        timestamp -
        animation.start -
        animation.delay;

    if (elapsed <= 0) {

        return 0;

    }

    return Math.min(
        elapsed /
        animation.duration,
        1
    );

}

/* =========================
   RUN ANIMATION
========================= */

function updateAnimation(
    animation,
    timestamp
) {

    if (
        animation.finished
    ) {

        return;
    }

    const progress =
        calculateProgress(
            animation,
            timestamp
        );

    const eased =
        animation.easing(
            progress
        );

    if (
        typeof animation.update ===
        "function"
    ) {

        animation.update(
            eased,
            progress
        );

    }

    if (
        progress >= 1
    ) {

        if (
            animation.loop
        ) {

            animation.start =
                now();

            return;

        }

        animation.finished =
            true;

        if (
            typeof animation.complete ===
            "function"
        ) {

            animation.complete();

        }

    }

}

/* =========================
   UPDATE TIMELINES
========================= */

function updateTimelines(
    timestamp
) {

    animationEngine.timelines.forEach(
        function runTimeline(
            timeline
        ) {

            timeline(
                timestamp
            );

        }
    );

}

/* =========================
   CLEAN FINISHED
========================= */

function cleanupAnimations() {

    animationEngine.animations.forEach(
        function scanAnimation(
            animation,
            id
        ) {

            if (
                animation.finished
            ) {

                removeAnimation(
                    id
                );

            }

        }
    );

}

/* =========================
   ANIMATION LOOP
========================= */

function animationLoop(
    timestamp
) {

    if (
        !animationEngine.running
    ) {

        return;
    }

    animationEngine.animations.forEach(
        function executeAnimation(
            animation
        ) {

            updateAnimation(
                animation,
                timestamp
            );

        }
    );

    updateTimelines(
        timestamp
    );

    cleanupAnimations();

    animationEngine.frameId =
        window.requestAnimationFrame(
            animationLoop
        );

}

/* =========================
   START LOOP
========================= */

function startAnimationEngine() {

    if (
        animationEngine.running
    ) {

        return;
    }

    animationEngine.running =
        true;

    animationEngine.frameId =
        window.requestAnimationFrame(
            animationLoop
        );

}

/* =========================
   STOP LOOP
========================= */

function stopAnimationEngine() {

    animationEngine.running =
        false;

    if (
        animationEngine.frameId !==
        null
    ) {

        window.cancelAnimationFrame(
            animationEngine.frameId
        );

        animationEngine.frameId =
            null;

    }

}

/* =========================
   ELEMENT FADE
========================= */

function animateFadeIn(
    element,
    duration = 800
) {

    if (!element) {
        return;
    }

    element.style.opacity = 0;

    registerAnimation(
        `fade-${Date.now()}`,
        {

            duration,

            easing:
                easing.easeOutExpo,

            update(progress) {

                element.style.opacity =
                    progress;

            }

        }
    );

}

/* =========================
   FLOAT ANIMATION
========================= */

function animateFloating(
    element,
    amplitude = 12
) {

    if (!element) {
        return;
    }

    const id =
        `float-${Date.now()}`;

    registerAnimation(
        id,
        {

            duration: 4000,

            loop: true,

            easing:
                easing.linear,

            update(progress) {

                const angle =
                    progress *
                    Math.PI * 2;

                const y =
                    Math.sin(angle) *
                    amplitude;

                element.style.transform =
                    `translate3d(0, ${y}px, 0)`;

            }

        }
    );

    return id;

}

/* =========================
   PULSE ANIMATION
========================= */

function animatePulse(
    element
) {

    if (!element) {
        return;
    }

    registerAnimation(
        `pulse-${Date.now()}`,
        {

            duration: 2200,

            loop: true,

            easing:
                easing.easeInOutQuad,

            update(progress) {

                const scale =
                    1 +
                    (
                        Math.sin(
                            progress *
                            Math.PI
                        ) * 0.08
                    );

                element.style.transform =
                    `scale(${scale})`;

            }

        }
    );

}

/* =========================
   TIMELINE
========================= */

function registerTimeline(
    id,
    callback
) {

    if (
        typeof callback !==
        "function"
    ) {

        return;
    }

    animationEngine.timelines.set(
        id,
        callback
    );

}

/* =========================
   REMOVE TIMELINE
========================= */

function removeTimeline(
    id
) {

    animationEngine.timelines.delete(
        id
    );

}

/* =========================
   REDUCED MOTION
========================= */

function handleReducedMotion(
    reducedMotion
) {

    if (reducedMotion) {

        stopAnimationEngine();

        animationEngine.animations.clear();

        animationEngine.timelines.clear();

        return;

    }

    startAnimationEngine();

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const unsubscribe =
        subscribeState(
            "system.reducedMotion",
            handleReducedMotion
        );

    animationEngine.cleanupTasks.push(
        unsubscribe
    );

}

/* =========================
   CLEANUP
========================= */

function destroyAnimations() {

    animationEngine.animations.clear();

    animationEngine.timelines.clear();

}

/* =========================
   INITIALIZE
========================= */

function initializeAnimationEngine() {

    if (
        animationEngine.initialized
    ) {

        return;
    }

    initializeSubscriptions();

    const reducedMotion =
        getState(
            "system.reducedMotion"
        );

    if (!reducedMotion) {

        startAnimationEngine();

    }

    animationEngine.initialized =
        true;

    console.info(
        "%cANIMATION ENGINE ONLINE",
        [
            "color:#79f2ff",
            "font-weight:700",
            "letter-spacing:0.08em"
        ].join(";")
    );

}

/* =========================
   DESTROY
========================= */

function destroyAnimationEngine() {

    stopAnimationEngine();

    destroyAnimations();

    animationEngine.initialized =
        false;

    console.info(
        "%cANIMATION ENGINE DESTROYED",
        [
            "color:#ff7a7a",
            "font-weight:700"
        ].join(";")
    );

}

/* =========================
   EXPORTS
========================= */

export {

    animationEngine,

    easing,

    initializeAnimationEngine,

    destroyAnimationEngine,

    registerAnimation,

    removeAnimation,

    registerTimeline,

    removeTimeline,

    animateFadeIn,

    animateFloating,

    animatePulse

}; 
