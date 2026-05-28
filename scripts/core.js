// FILE: /aoichan-native/scripts/core.js

const portalRuntime = {

    initialized: false,

    viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
    },

    pointer: {
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0
    },

    gyroscope: {
        beta: 0,
        gamma: 0,
        enabled: false
    },

    animationFrameId: null,

    listeners: [],

    parallaxNodes: [],

    dom: {}
};

/* =========================
   DOM CACHE
========================= */

function cacheDomReferences() {

    portalRuntime.dom.root =
        document.getElementById("portal-root");

    portalRuntime.dom.background =
        document.getElementById("portal-background");

    portalRuntime.dom.stage =
        document.getElementById("portal-parallax-stage");

    portalRuntime.dom.uiLayer =
        document.getElementById("portal-ui-layer");

    portalRuntime.dom.sidebar =
        document.getElementById("portal-sidebar");

    portalRuntime.dom.viewer =
        document.getElementById("portal-document-viewer");

    portalRuntime.dom.modalRoot =
        document.getElementById("portal-modal-root");

    portalRuntime.dom.notificationRoot =
        document.getElementById("portal-notification-root");

}

/* =========================
   PARALLAX NODE SCAN
========================= */

function collectParallaxNodes() {

    portalRuntime.parallaxNodes =
        Array.from(
            document.querySelectorAll("[data-depth]")
        );

}

/* =========================
   POINTER UPDATE
========================= */

function updatePointerPosition(event) {

    const viewportWidth =
        portalRuntime.viewport.width;

    const viewportHeight =
        portalRuntime.viewport.height;

    const pointerX =
        event.clientX;

    const pointerY =
        event.clientY;

    portalRuntime.pointer.x =
        pointerX;

    portalRuntime.pointer.y =
        pointerY;

    portalRuntime.pointer.normalizedX =
        ((pointerX / viewportWidth) - 0.5) * 2;

    portalRuntime.pointer.normalizedY =
        ((pointerY / viewportHeight) - 0.5) * 2;

}

/* =========================
   GYROSCOPE UPDATE
========================= */

function updateGyroscope(event) {

    const gamma =
        Number(event.gamma) || 0;

    const beta =
        Number(event.beta) || 0;

    portalRuntime.gyroscope.gamma =
        clamp(gamma, -45, 45);

    portalRuntime.gyroscope.beta =
        clamp(beta, -45, 45);

}

/* =========================
   CLAMP UTILITY
========================= */

function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );

}

/* =========================
   VIEWPORT UPDATE
========================= */

function updateViewportMetrics() {

    portalRuntime.viewport.width =
        window.innerWidth;

    portalRuntime.viewport.height =
        window.innerHeight;

    portalRuntime.viewport.ratio =
        window.devicePixelRatio || 1;

}

/* =========================
   APPLY PARALLAX
========================= */

function applyParallaxMotion() {

    const pointerX =
        portalRuntime.pointer.normalizedX;

    const pointerY =
        portalRuntime.pointer.normalizedY;

    const gyroGamma =
        portalRuntime.gyroscope.gamma / 45;

    const gyroBeta =
        portalRuntime.gyroscope.beta / 45;

    const combinedX =
        pointerX + gyroGamma;

    const combinedY =
        pointerY + gyroBeta;

    const strengthX =
        parseFloat(
            getComputedStyle(document.documentElement)
                .getPropertyValue("--parallax-strength-x")
        ) || 1;

    const strengthY =
        parseFloat(
            getComputedStyle(document.documentElement)
                .getPropertyValue("--parallax-strength-y")
        ) || 1;

    const totalNodes =
        portalRuntime.parallaxNodes.length;

    for (
        let index = 0;
        index < totalNodes;
        index += 1
    ) {

        const node =
            portalRuntime.parallaxNodes[index];

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
                combinedX *
                60 *
                depth *
                strengthX;

        }

        if (
            axis === "y" ||
            axis === "both"
        ) {

            translateY =
                combinedY *
                60 *
                depth *
                strengthY;

        }

        node.style.transform =
            `translate3d(${translateX}px, ${translateY}px, 0)`;

    }

}

/* =========================
   RENDER LOOP
========================= */

function runtimeLoop() {

    applyParallaxMotion();

    portalRuntime.animationFrameId =
        window.requestAnimationFrame(
            runtimeLoop
        );

}

/* =========================
   LISTENER REGISTRY
========================= */

function registerListener(
    target,
    type,
    handler,
    options = false
) {

    target.addEventListener(
        type,
        handler,
        options
    );

    portalRuntime.listeners.push({
        target,
        type,
        handler,
        options
    });

}

/* =========================
   REMOVE LISTENERS
========================= */

function removeAllListeners() {

    const total =
        portalRuntime.listeners.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const listener =
            portalRuntime.listeners[index];

        listener.target.removeEventListener(
            listener.type,
            listener.handler,
            listener.options
        );

    }

    portalRuntime.listeners.length = 0;

}

/* =========================
   GYROSCOPE INIT
========================= */

async function initializeGyroscope() {

    const hasIOSPermission =
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function";

    if (hasIOSPermission) {

        try {

            const permission =
                await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {
                return;
            }

        } catch (error) {

            console.error(
                "[Gyroscope Permission Error]",
                error
            );

            return;

        }

    }

    registerListener(
        window,
        "deviceorientation",
        updateGyroscope,
        {
            passive: true
        }
    );

    portalRuntime.gyroscope.enabled = true;

}

/* =========================
   VISIBILITY HANDLER
========================= */

function handleVisibilityChange() {

    const hidden =
        document.hidden;

    if (hidden) {

        if (
            portalRuntime.animationFrameId !== null
        ) {

            window.cancelAnimationFrame(
                portalRuntime.animationFrameId
            );

            portalRuntime.animationFrameId = null;

        }

        return;

    }

    if (
        portalRuntime.animationFrameId === null
    ) {

        runtimeLoop();

    }

}

/* =========================
   INITIALIZE EVENTS
========================= */

function initializeRuntimeEvents() {

    registerListener(
        window,
        "mousemove",
        updatePointerPosition,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "resize",
        updateViewportMetrics,
        {
            passive: true
        }
    );

    registerListener(
        document,
        "visibilitychange",
        handleVisibilityChange
    );

}

/* =========================
   INITIALIZE RUNTIME
========================= */

async function initializePortalRuntime() {

    if (portalRuntime.initialized) {
        return;
    }

    cacheDomReferences();

    collectParallaxNodes();

    updateViewportMetrics();

    initializeRuntimeEvents();

    await initializeGyroscope();

    runtimeLoop();

    portalRuntime.initialized = true;

    document.documentElement.dataset.runtime =
        "initialized";

    console.info(
        "%cCOSMIC RUNTIME INITIALIZED",
        [
            "color: #79f2ff",
            "font-weight: 700",
            "letter-spacing: 0.12em"
        ].join(";")
    );

}

/* =========================
   DESTROY RUNTIME
========================= */

function destroyPortalRuntime() {

    removeAllListeners();

    if (
        portalRuntime.animationFrameId !== null
    ) {

        window.cancelAnimationFrame(
            portalRuntime.animationFrameId
        );

        portalRuntime.animationFrameId = null;

    }

    portalRuntime.initialized = false;

}

/* =========================
   STARTUP
========================= */

window.addEventListener(
    "beforeunload",
    destroyPortalRuntime,
    {
        passive: true
    }
);

window.addEventListener(
    "DOMContentLoaded",
    initializePortalRuntime,
    {
        passive: true,
        once: true
    }
); 
