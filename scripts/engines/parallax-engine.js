// FILE: /aoichan-native/scripts/engines/parallax-engine.js

import {

    getState,
    subscribeState

} from "../state.js";

/* =========================
   PARALLAX ENGINE
========================= */

const parallaxEngine = {

    initialized: false,

    enabled: true,

    frameId: null,

    nodes: [],

    viewport: {

        width: window.innerWidth,

        height: window.innerHeight

    },

    smoothing: 0.08,

    intensity: 60,

    current: {

        x: 0,
        y: 0

    },

    target: {

        x: 0,
        y: 0

    },

    cleanupTasks: []

};

/* =========================
   NODE COLLECTION
========================= */

function collectParallaxNodes() {

    parallaxEngine.nodes =
        Array.from(
            document.querySelectorAll(
                "[data-depth]"
            )
        );

}

/* =========================
   VIEWPORT CACHE
========================= */

function updateViewportCache() {

    parallaxEngine.viewport.width =
        window.innerWidth;

    parallaxEngine.viewport.height =
        window.innerHeight;

}

/* =========================
   LERP
========================= */

function lerp(
    start,
    end,
    factor
) {

    return (
        start +
        (end - start) * factor
    );

}

/* =========================
   TARGET UPDATE
========================= */

function updateParallaxTarget() {

    const pointerX =
        getState(
            "pointer.normalizedX"
        ) || 0;

    const pointerY =
        getState(
            "pointer.normalizedY"
        ) || 0;

    const gyroGamma =
        (
            getState(
                "gyroscope.gamma"
            ) || 0
        ) / 45;

    const gyroBeta =
        (
            getState(
                "gyroscope.beta"
            ) || 0
        ) / 45;

    parallaxEngine.target.x =
        pointerX + gyroGamma;

    parallaxEngine.target.y =
        pointerY + gyroBeta;

}

/* =========================
   SMOOTHING
========================= */

function smoothParallaxMotion() {

    parallaxEngine.current.x =
        lerp(
            parallaxEngine.current.x,
            parallaxEngine.target.x,
            parallaxEngine.smoothing
        );

    parallaxEngine.current.y =
        lerp(
            parallaxEngine.current.y,
            parallaxEngine.target.y,
            parallaxEngine.smoothing
        );

}

/* =========================
   TRANSFORM NODE
========================= */

function transformNode(node) {

    const depth =
        parseFloat(
            node.dataset.depth
        ) || 0;

    const axis =
        node.dataset.axis || "both";

    let translateX = 0;

    let translateY = 0;

    if (
        axis === "x" ||
        axis === "both"
    ) {

        translateX =
            parallaxEngine.current.x *
            parallaxEngine.intensity *
            depth;

    }

    if (
        axis === "y" ||
        axis === "both"
    ) {

        translateY =
            parallaxEngine.current.y *
            parallaxEngine.intensity *
            depth;

    }

    const existingTransform =
        getBaseTransform(node);

    node.style.transform =
        `${existingTransform} translate3d(${translateX}px, ${translateY}px, 0)`;

}

/* =========================
   BASE TRANSFORM
========================= */

function getBaseTransform(node) {

    if (
        node.classList.contains(
            "nebula-layer"
        )
    ) {

        return (
            "translateZ(-120px) scale(1.15)"
        );

    }

    if (
        node.classList.contains(
            "starfield-layer"
        )
    ) {

        return (
            "translateZ(-80px) scale(1.08)"
        );

    }

    if (
        node.classList.contains(
            "orb-alpha"
        )
    ) {

        return (
            "translateZ(60px)"
        );

    }

    if (
        node.classList.contains(
            "orb-beta"
        )
    ) {

        return (
            "translateZ(90px)"
        );

    }

    if (
        node.classList.contains(
            "orb-gamma"
        )
    ) {

        return (
            "translateZ(120px)"
        );

    }

    return "";

}

/* =========================
   APPLY MOTION
========================= */

function applyParallaxTransforms() {

    const total =
        parallaxEngine.nodes.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const node =
            parallaxEngine.nodes[index];

        transformNode(node);

    }

}

/* =========================
   RENDER LOOP
========================= */

function parallaxLoop() {

    if (
        !parallaxEngine.enabled
    ) {

        return;

    }

    updateParallaxTarget();

    smoothParallaxMotion();

    applyParallaxTransforms();

    parallaxEngine.frameId =
        window.requestAnimationFrame(
            parallaxLoop
        );

}

/* =========================
   START ENGINE
========================= */

function startParallaxEngine() {

    if (
        parallaxEngine.frameId !== null
    ) {

        return;
    }

    parallaxEngine.enabled = true;

    parallaxLoop();

}

/* =========================
   STOP ENGINE
========================= */

function stopParallaxEngine() {

    parallaxEngine.enabled = false;

    if (
        parallaxEngine.frameId !== null
    ) {

        window.cancelAnimationFrame(
            parallaxEngine.frameId
        );

        parallaxEngine.frameId =
            null;

    }

}

/* =========================
   RESET TRANSFORMS
========================= */

function resetParallaxTransforms() {

    const total =
        parallaxEngine.nodes.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const node =
            parallaxEngine.nodes[index];

        const baseTransform =
            getBaseTransform(node);

        node.style.transform =
            baseTransform;

    }

}

/* =========================
   REDUCED MOTION
========================= */

function handleReducedMotion(
    reducedMotion
) {

    if (reducedMotion) {

        stopParallaxEngine();

        resetParallaxTransforms();

        return;

    }

    startParallaxEngine();

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const unsubscribeViewport =
        subscribeState(
            "viewport.width",
            updateViewportCache
        );

    const unsubscribeReducedMotion =
        subscribeState(
            "system.reducedMotion",
            handleReducedMotion
        );

    parallaxEngine.cleanupTasks.push(
        unsubscribeViewport
    );

    parallaxEngine.cleanupTasks.push(
        unsubscribeReducedMotion
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupParallaxEngine() {

    const total =
        parallaxEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            parallaxEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[PARALLAX CLEANUP ERROR]",
                error
            );

        }

    }

    parallaxEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeParallaxEngine() {

    if (
        parallaxEngine.initialized
    ) {

        return;
    }

    collectParallaxNodes();

    updateViewportCache();

    initializeSubscriptions();

    const reducedMotion =
        getState(
            "system.reducedMotion"
        );

    if (!reducedMotion) {

        startParallaxEngine();

    }

    parallaxEngine.initialized = true;

    console.info(
        "%cPARALLAX ENGINE ONLINE",
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

function destroyParallaxEngine() {

    stopParallaxEngine();

    cleanupParallaxEngine();

    parallaxEngine.nodes.length = 0;

    parallaxEngine.current.x = 0;
    parallaxEngine.current.y = 0;

    parallaxEngine.target.x = 0;
    parallaxEngine.target.y = 0;

    parallaxEngine.initialized = false;

    console.info(
        "%cPARALLAX ENGINE DESTROYED",
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

    parallaxEngine,

    initializeParallaxEngine,

    destroyParallaxEngine,

    startParallaxEngine,

    stopParallaxEngine

}; 
