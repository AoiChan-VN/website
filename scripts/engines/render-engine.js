// FILE: /aoichan-native/scripts/engines/render-engine.js

import {

    getState,
    subscribeState

} from "../state.js";

/* =========================
   RENDER ENGINE
========================= */

const renderEngine = {

    initialized: false,

    running: false,

    frameId: null,

    deltaTime: 0,

    previousTime: 0,

    fps: 60,

    frameCounter: 0,

    frameAccumulator: 0,

    renderQueue: new Set(),

    cleanupTasks: []

};

/* =========================
   DOM CACHE
========================= */

const dom = {

    root:
        document.getElementById(
            "portal-root"
        ),

    viewer:
        document.getElementById(
            "portal-document-viewer"
        ),

    topbar:
        document.getElementById(
            "portal-topbar"
        ),

    sidebar:
        document.getElementById(
            "portal-sidebar"
        )

};

/* =========================
   TIME
========================= */

function calculateDeltaTime(timestamp) {

    if (
        renderEngine.previousTime === 0
    ) {

        renderEngine.previousTime =
            timestamp;

    }

    renderEngine.deltaTime =
        timestamp -
        renderEngine.previousTime;

    renderEngine.previousTime =
        timestamp;

}

/* =========================
   FPS
========================= */

function calculateFPS(timestamp) {

    renderEngine.frameCounter += 1;

    if (
        renderEngine.frameAccumulator === 0
    ) {

        renderEngine.frameAccumulator =
            timestamp;

    }

    const elapsed =
        timestamp -
        renderEngine.frameAccumulator;

    if (elapsed >= 1000) {

        renderEngine.fps =
            Math.round(
                (
                    renderEngine.frameCounter *
                    1000
                ) / elapsed
            );

        renderEngine.frameCounter = 0;

        renderEngine.frameAccumulator =
            timestamp;

    }

}

/* =========================
   RENDER QUEUE
========================= */

function processRenderQueue() {

    if (
        renderEngine.renderQueue.size === 0
    ) {

        return;

    }

    renderEngine.renderQueue.forEach(
        function executeRenderTask(task) {

            try {

                task();

            } catch (error) {

                console.error(
                    "[RENDER TASK ERROR]",
                    error
                );

            }

        }
    );

    renderEngine.renderQueue.clear();

}

/* =========================
   ROOT DATASET
========================= */

function updateRootRuntimeState() {

    if (!dom.root) {
        return;
    }

    dom.root.dataset.runtime =
        getState(
            "system.runtimeStatus"
        );

    dom.root.dataset.panel =
        getState(
            "system.activePanel"
        );

    dom.root.dataset.viewer =
        getState(
            "system.activeViewer"
        );

}

/* =========================
   VIEWER DATASET
========================= */

function updateViewerState() {

    if (!dom.viewer) {
        return;
    }

    const loading =
        getState(
            "viewer.loading"
        );

    const currentType =
        getState(
            "viewer.currentType"
        );

    dom.viewer.dataset.loading =
        String(loading);

    dom.viewer.dataset.viewer =
        currentType || "default";

}

/* =========================
   RESPONSIVE MODE
========================= */

function updateResponsiveMode() {

    if (!dom.root) {
        return;
    }

    const width =
        getState(
            "viewport.width"
        );

    let mode =
        "desktop";

    if (width <= 640) {

        mode = "mobile";

    } else if (width <= 980) {

        mode = "tablet";

    }

    dom.root.dataset.viewport =
        mode;

}

/* =========================
   REDUCED MOTION
========================= */

function updateReducedMotionState() {

    if (!dom.root) {
        return;
    }

    const reducedMotion =
        getState(
            "system.reducedMotion"
        );

    dom.root.dataset.reducedMotion =
        String(reducedMotion);

}

/* =========================
   RENDER FRAME
========================= */

function renderFrame(timestamp) {

    if (
        !renderEngine.running
    ) {

        return;

    }

    calculateDeltaTime(timestamp);

    calculateFPS(timestamp);

    processRenderQueue();

    renderEngine.frameId =
        window.requestAnimationFrame(
            renderFrame
        );

}

/* =========================
   START RENDERER
========================= */

function startRenderLoop() {

    if (
        renderEngine.running
    ) {

        return;

    }

    renderEngine.running = true;

    renderEngine.frameId =
        window.requestAnimationFrame(
            renderFrame
        );

}

/* =========================
   STOP RENDERER
========================= */

function stopRenderLoop() {

    renderEngine.running = false;

    if (
        renderEngine.frameId !== null
    ) {

        window.cancelAnimationFrame(
            renderEngine.frameId
        );

        renderEngine.frameId =
            null;

    }

}

/* =========================
   QUEUE TASK
========================= */

function queueRenderTask(task) {

    if (
        typeof task !== "function"
    ) {

        return;

    }

    renderEngine.renderQueue.add(task);

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const unsubscribers = [];

    unsubscribers.push(
        subscribeState(
            "system.runtimeStatus",
            updateRootRuntimeState
        )
    );

    unsubscribers.push(
        subscribeState(
            "system.activePanel",
            updateRootRuntimeState
        )
    );

    unsubscribers.push(
        subscribeState(
            "system.activeViewer",
            function handleViewerChange() {

                updateRootRuntimeState();

                updateViewerState();

            }
        )
    );

    unsubscribers.push(
        subscribeState(
            "viewer.loading",
            updateViewerState
        )
    );

    unsubscribers.push(
        subscribeState(
            "viewport.width",
            updateResponsiveMode
        )
    );

    unsubscribers.push(
        subscribeState(
            "system.reducedMotion",
            updateReducedMotionState
        )
    );

    const total =
        unsubscribers.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const unsubscribe =
            unsubscribers[index];

        renderEngine.cleanupTasks.push(
            unsubscribe
        );

    }

}

/* =========================
   INITIAL RENDER
========================= */

function initializeRenderState() {

    updateRootRuntimeState();

    updateViewerState();

    updateResponsiveMode();

    updateReducedMotionState();

}

/* =========================
   CLEANUP
========================= */

function cleanupRenderEngine() {

    const total =
        renderEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            renderEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[RENDER CLEANUP ERROR]",
                error
            );

        }

    }

    renderEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE ENGINE
========================= */

function initializeRenderEngine() {

    if (
        renderEngine.initialized
    ) {

        return;
    }

    initializeRenderState();

    initializeSubscriptions();

    startRenderLoop();

    renderEngine.initialized = true;

    console.info(
        "%cRENDER ENGINE ONLINE",
        [
            "color:#79f2ff",
            "font-weight:700",
            "letter-spacing:0.08em"
        ].join(";")
    );

}

/* =========================
   DESTROY ENGINE
========================= */

function destroyRenderEngine() {

    stopRenderLoop();

    cleanupRenderEngine();

    renderEngine.initialized = false;

    renderEngine.previousTime = 0;

    renderEngine.deltaTime = 0;

    renderEngine.renderQueue.clear();

    console.info(
        "%cRENDER ENGINE DESTROYED",
        [
            "color:#ff8080",
            "font-weight:700"
        ].join(";")
    );

}

/* =========================
   EXPORTS
========================= */

export {

    renderEngine,

    initializeRenderEngine,

    destroyRenderEngine,

    queueRenderTask,

    startRenderLoop,

    stopRenderLoop

}; 
