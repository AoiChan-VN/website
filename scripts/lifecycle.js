// FILE: /aoichan-native/scripts/lifecycle.js

import {

    initializeStateSystem,
    syncViewportState,
    syncPointerState,
    syncGyroscopeState,
    setState,
    getState

} from "./state.js";

/* =========================
   LIFECYCLE RUNTIME
========================= */

const lifecycleRuntime = {

    initialized: false,

    destroyed: false,

    animationFrameId: null,

    listeners: [],

    mediaQueries: [],

    cleanupTasks: []

};

/* =========================
   DOM REFERENCES
========================= */

const dom = {

    root:
        document.getElementById("portal-root"),

    stage:
        document.getElementById("portal-parallax-stage"),

    sidebar:
        document.getElementById("portal-sidebar"),

    viewer:
        document.getElementById("portal-document-viewer"),

    notificationRoot:
        document.getElementById("portal-notification-root")

};

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

    lifecycleRuntime.listeners.push({
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
        lifecycleRuntime.listeners.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const listener =
            lifecycleRuntime.listeners[index];

        listener.target.removeEventListener(
            listener.type,
            listener.handler,
            listener.options
        );

    }

    lifecycleRuntime.listeners.length = 0;

}

/* =========================
   CLEANUP TASK
========================= */

function registerCleanupTask(task) {

    if (
        typeof task !== "function"
    ) {

        return;

    }

    lifecycleRuntime.cleanupTasks.push(task);

}

/* =========================
   RUN CLEANUP
========================= */

function runCleanupTasks() {

    const total =
        lifecycleRuntime.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            lifecycleRuntime.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[CLEANUP ERROR]",
                error
            );

        }

    }

    lifecycleRuntime.cleanupTasks.length = 0;

}

/* =========================
   VIEWPORT HANDLER
========================= */

function handleViewportResize() {

    syncViewportState();

}

/* =========================
   POINTER HANDLER
========================= */

function handlePointerMove(event) {

    const viewportWidth =
        window.innerWidth;

    const viewportHeight =
        window.innerHeight;

    const pointerX =
        event.clientX;

    const pointerY =
        event.clientY;

    const normalizedX =
        ((pointerX / viewportWidth) - 0.5) * 2;

    const normalizedY =
        ((pointerY / viewportHeight) - 0.5) * 2;

    syncPointerState({
        x: pointerX,
        y: pointerY,
        normalizedX,
        normalizedY
    });

}

/* =========================
   GYROSCOPE HANDLER
========================= */

function handleGyroscope(event) {

    const beta =
        Number(event.beta) || 0;

    const gamma =
        Number(event.gamma) || 0;

    syncGyroscopeState({
        beta:
            clamp(beta, -45, 45),

        gamma:
            clamp(gamma, -45, 45),

        enabled: true
    });

}

/* =========================
   CLAMP
========================= */

function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(value, min),
        max
    );

}

/* =========================
   REDUCED MOTION
========================= */

function initializeReducedMotionTracking() {

    const mediaQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    const handleChange =
        function handleReducedMotion(event) {

            setState(
                "system.reducedMotion",
                event.matches
            );

        };

    mediaQuery.addEventListener(
        "change",
        handleChange
    );

    lifecycleRuntime.mediaQueries.push({
        mediaQuery,
        handleChange
    });

}

/* =========================
   REMOVE MEDIA QUERIES
========================= */

function removeMediaQueries() {

    const total =
        lifecycleRuntime.mediaQueries.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const item =
            lifecycleRuntime.mediaQueries[index];

        item.mediaQuery.removeEventListener(
            "change",
            item.handleChange
        );

    }

    lifecycleRuntime.mediaQueries.length = 0;

}

/* =========================
   DEVICE ORIENTATION
========================= */

async function initializeGyroscope() {

    const requiresPermission =
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function";

    if (requiresPermission) {

        try {

            const permission =
                await DeviceOrientationEvent.requestPermission();

            if (
                permission !== "granted"
            ) {

                return;

            }

        } catch (error) {

            console.warn(
                "[GYROSCOPE ACCESS DENIED]",
                error
            );

            return;

        }

    }

    registerListener(
        window,
        "deviceorientation",
        handleGyroscope,
        {
            passive: true
        }
    );

}

/* =========================
   VISIBILITY CONTROL
========================= */

function handleVisibilityState() {

    const hidden =
        document.hidden;

    if (hidden) {

        pauseLifecycle();

        return;

    }

    resumeLifecycle();

}

/* =========================
   RAF LOOP
========================= */

function lifecycleFrameLoop() {

    lifecycleRuntime.animationFrameId =
        window.requestAnimationFrame(
            lifecycleFrameLoop
        );

}

/* =========================
   START LOOP
========================= */

function startLifecycleLoop() {

    if (
        lifecycleRuntime.animationFrameId !== null
    ) {

        return;

    }

    lifecycleFrameLoop();

}

/* =========================
   STOP LOOP
========================= */

function stopLifecycleLoop() {

    if (
        lifecycleRuntime.animationFrameId === null
    ) {

        return;

    }

    window.cancelAnimationFrame(
        lifecycleRuntime.animationFrameId
    );

    lifecycleRuntime.animationFrameId =
        null;

}

/* =========================
   PAUSE
========================= */

function pauseLifecycle() {

    stopLifecycleLoop();

    setState(
        "system.runtimeStatus",
        "paused"
    );

}

/* =========================
   RESUME
========================= */

function resumeLifecycle() {

    startLifecycleLoop();

    setState(
        "system.runtimeStatus",
        "running"
    );

}

/* =========================
   UI STATE ATTRIBUTES
========================= */

function initializeRootAttributes() {

    if (!dom.root) {
        return;
    }

    dom.root.dataset.system =
        "online";

    dom.root.dataset.viewer =
        getState(
            "system.activeViewer"
        );

    dom.root.dataset.panel =
        getState(
            "system.activePanel"
        );

}

/* =========================
   PANEL BUTTONS
========================= */

function initializePanelButtons() {

    const buttons =
        Array.from(
            document.querySelectorAll(
                ".sidebar-button"
            )
        );

    const total =
        buttons.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const button =
            buttons[index];

        const handleClick =
            function handlePanelClick() {

                const panel =
                    button.dataset.panel;

                if (!panel) {
                    return;
                }

                updateActivePanel(
                    panel,
                    buttons
                );

            };

        registerListener(
            button,
            "click",
            handleClick,
            {
                passive: true
            }
        );

    }

}

/* =========================
   PANEL UPDATE
========================= */

function updateActivePanel(
    panelName,
    buttons
) {

    setState(
        "system.activePanel",
        panelName
    );

    if (dom.root) {

        dom.root.dataset.panel =
            panelName;

    }

    const total =
        buttons.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const button =
            buttons[index];

        const isActive =
            button.dataset.panel === panelName;

        button.classList.toggle(
            "active",
            isActive
        );

    }

}

/* =========================
   INITIALIZE EVENTS
========================= */

function initializeLifecycleEvents() {

    registerListener(
        window,
        "resize",
        handleViewportResize,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "mousemove",
        handlePointerMove,
        {
            passive: true
        }
    );

    registerListener(
        document,
        "visibilitychange",
        handleVisibilityState
    );

}

/* =========================
   INITIALIZE SYSTEM
========================= */

async function initializeLifecycle() {

    if (
        lifecycleRuntime.initialized
    ) {

        return;
    }

    initializeStateSystem();

    initializeRootAttributes();

    initializePanelButtons();

    initializeLifecycleEvents();

    initializeReducedMotionTracking();

    await initializeGyroscope();

    startLifecycleLoop();

    lifecycleRuntime.initialized = true;

    lifecycleRuntime.destroyed = false;

    console.info(
        "%cLIFECYCLE SYSTEM ONLINE",
        [
            "color:#79f2ff",
            "font-weight:700",
            "letter-spacing:0.08em"
        ].join(";")
    );

}

/* =========================
   DESTROY SYSTEM
========================= */

function destroyLifecycle() {

    if (
        lifecycleRuntime.destroyed
    ) {

        return;
    }

    stopLifecycleLoop();

    removeAllListeners();

    removeMediaQueries();

    runCleanupTasks();

    lifecycleRuntime.destroyed = true;

    lifecycleRuntime.initialized = false;

    setState(
        "system.runtimeStatus",
        "destroyed"
    );

    console.info(
        "%cLIFECYCLE DESTROYED",
        [
            "color:#ff7a7a",
            "font-weight:700"
        ].join(";")
    );

}

/* =========================
   AUTO START
========================= */

window.addEventListener(
    "DOMContentLoaded",
    initializeLifecycle,
    {
        once: true,
        passive: true
    }
);

window.addEventListener(
    "beforeunload",
    destroyLifecycle,
    {
        passive: true
    }
);

/* =========================
   EXPORTS
========================= */

export {

    initializeLifecycle,

    destroyLifecycle,

    pauseLifecycle,

    resumeLifecycle,

    registerCleanupTask

}; 
