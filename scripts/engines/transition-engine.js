// FILE: /aoichan-native/scripts/engines/transition-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

import {

    registerAnimation,
    easing

} from "./animation-engine.js";

/* =========================
   TRANSITION ENGINE
========================= */

const transitionEngine = {

    initialized: false,

    activeTransitions: new Map(),

    transitionQueue: [],

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

    sidebar:
        document.getElementById(
            "portal-sidebar"
        ),

    topbar:
        document.getElementById(
            "portal-topbar"
        )

};

/* =========================
   TRANSITION ID
========================= */

function createTransitionId(
    prefix = "transition"
) {

    return (
        `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9999)}`
    );

}

/* =========================
   APPLY STYLES
========================= */

function applyStyles(
    element,
    styles
) {

    if (
        !element ||
        !styles
    ) {

        return;
    }

    Object.assign(
        element.style,
        styles
    );

}

/* =========================
   RESET TRANSITION
========================= */

function resetTransitionStyles(
    element
) {

    if (!element) {
        return;
    }

    element.style.transition =
        "";

    element.style.opacity =
        "";

    element.style.transform =
        "";

    element.style.filter =
        "";

}

/* =========================
   FADE TRANSITION
========================= */

function fadeTransition(
    element,
    options = {}
) {

    if (!element) {
        return;
    }

    const duration =
        options.duration || 600;

    const id =
        createTransitionId(
            "fade"
        );

    applyStyles(
        element,
        {
            opacity: 0
        }
    );

    registerAnimation(
        id,
        {

            duration,

            easing:
                easing.easeOutExpo,

            update(progress) {

                element.style.opacity =
                    progress;

            },

            complete() {

                transitionEngine.activeTransitions.delete(
                    id
                );

            }

        }
    );

    transitionEngine.activeTransitions.set(
        id,
        {
            type: "fade",
            element
        }
    );

}

/* =========================
   SLIDE TRANSITION
========================= */

function slideTransition(
    element,
    direction = "up",
    options = {}
) {

    if (!element) {
        return;
    }

    const duration =
        options.duration || 720;

    const distance =
        options.distance || 48;

    let startTransform =
        "translate3d(0, 0, 0)";

    if (
        direction === "up"
    ) {

        startTransform =
            `translate3d(0, ${distance}px, 0)`;

    }

    if (
        direction === "down"
    ) {

        startTransform =
            `translate3d(0, -${distance}px, 0)`;

    }

    if (
        direction === "left"
    ) {

        startTransform =
            `translate3d(${distance}px, 0, 0)`;

    }

    if (
        direction === "right"
    ) {

        startTransform =
            `translate3d(-${distance}px, 0, 0)`;

    }

    const id =
        createTransitionId(
            "slide"
        );

    applyStyles(
        element,
        {
            opacity: 0,
            transform:
                startTransform
        }
    );

    registerAnimation(
        id,
        {

            duration,

            easing:
                easing.easeOutCubic,

            update(progress) {

                const inverse =
                    1 - progress;

                let x = 0;
                let y = 0;

                if (
                    direction === "up"
                ) {

                    y =
                        inverse *
                        distance;

                }

                if (
                    direction === "down"
                ) {

                    y =
                        inverse *
                        -distance;

                }

                if (
                    direction === "left"
                ) {

                    x =
                        inverse *
                        distance;

                }

                if (
                    direction === "right"
                ) {

                    x =
                        inverse *
                        -distance;

                }

                element.style.opacity =
                    progress;

                element.style.transform =
                    `translate3d(${x}px, ${y}px, 0)`;

            },

            complete() {

                resetTransitionStyles(
                    element
                );

                transitionEngine.activeTransitions.delete(
                    id
                );

            }

        }
    );

    transitionEngine.activeTransitions.set(
        id,
        {
            type: "slide",
            element
        }
    );

}

/* =========================
   BLUR REVEAL
========================= */

function blurRevealTransition(
    element,
    options = {}
) {

    if (!element) {
        return;
    }

    const duration =
        options.duration || 900;

    const blur =
        options.blur || 18;

    const id =
        createTransitionId(
            "blur"
        );

    applyStyles(
        element,
        {
            opacity: 0,
            filter:
                `blur(${blur}px)`
        }
    );

    registerAnimation(
        id,
        {

            duration,

            easing:
                easing.easeOutExpo,

            update(progress) {

                const inverse =
                    1 - progress;

                element.style.opacity =
                    progress;

                element.style.filter =
                    `blur(${inverse * blur}px)`;

            },

            complete() {

                resetTransitionStyles(
                    element
                );

                transitionEngine.activeTransitions.delete(
                    id
                );

            }

        }
    );

    transitionEngine.activeTransitions.set(
        id,
        {
            type: "blur",
            element
        }
    );

}

/* =========================
   PANEL TRANSITION
========================= */

function transitionPanel(
    panelName
) {

    if (!dom.root) {
        return;
    }

    dom.root.dataset.transition =
        "active";

    fadeTransition(
        dom.root,
        {
            duration: 500
        }
    );

    window.setTimeout(
        function finalizePanel() {

            dom.root.dataset.panel =
                panelName;

            dom.root.dataset.transition =
                "idle";

        },
        420
    );

}

/* =========================
   VIEWER TRANSITION
========================= */

function transitionViewer() {

    if (!dom.viewer) {
        return;
    }

    blurRevealTransition(
        dom.viewer,
        {
            duration: 780,
            blur: 22
        }
    );

}

/* =========================
   SIDEBAR TRANSITION
========================= */

function transitionSidebar() {

    if (!dom.sidebar) {
        return;
    }

    slideTransition(
        dom.sidebar,
        "left",
        {
            duration: 640,
            distance: 26
        }
    );

}

/* =========================
   TOPBAR TRANSITION
========================= */

function transitionTopbar() {

    if (!dom.topbar) {
        return;
    }

    slideTransition(
        dom.topbar,
        "down",
        {
            duration: 540,
            distance: 18
        }
    );

}

/* =========================
   ACTIVE PANEL
========================= */

function handlePanelTransition(
    panel
) {

    transitionPanel(
        panel
    );

    transitionSidebar();

}

/* =========================
   ACTIVE VIEWER
========================= */

function handleViewerTransition() {

    transitionViewer();

}

/* =========================
   QUEUE TRANSITION
========================= */

function queueTransition(
    callback
) {

    if (
        typeof callback !==
        "function"
    ) {

        return;
    }

    transitionEngine.transitionQueue.push(
        callback
    );

}

/* =========================
   RUN QUEUE
========================= */

function runTransitionQueue() {

    const total =
        transitionEngine.transitionQueue.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const callback =
            transitionEngine.transitionQueue[index];

        try {

            callback();

        } catch (error) {

            console.error(
                "[TRANSITION QUEUE ERROR]",
                error
            );

        }

    }

    transitionEngine.transitionQueue.length = 0;

}

/* =========================
   REDUCED MOTION
========================= */

function handleReducedMotion(
    reducedMotion
) {

    if (!reducedMotion) {
        return;
    }

    transitionEngine.activeTransitions.clear();

    if (dom.root) {

        dom.root.dataset.transition =
            "disabled";

    }

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const panelSubscription =
        subscribeState(
            "system.activePanel",
            handlePanelTransition
        );

    const viewerSubscription =
        subscribeState(
            "system.activeViewer",
            handleViewerTransition
        );

    const reducedMotionSubscription =
        subscribeState(
            "system.reducedMotion",
            handleReducedMotion
        );

    transitionEngine.cleanupTasks.push(
        panelSubscription
    );

    transitionEngine.cleanupTasks.push(
        viewerSubscription
    );

    transitionEngine.cleanupTasks.push(
        reducedMotionSubscription
    );

}

/* =========================
   INITIAL BOOT
========================= */

function initializeBootTransitions() {

    transitionTopbar();

    transitionSidebar();

    transitionViewer();

}

/* =========================
   CLEANUP
========================= */

function cleanupTransitionEngine() {

    const total =
        transitionEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            transitionEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[TRANSITION CLEANUP ERROR]",
                error
            );

        }

    }

    transitionEngine.cleanupTasks.length = 0;

    transitionEngine.activeTransitions.clear();

    transitionEngine.transitionQueue.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeTransitionEngine() {

    if (
        transitionEngine.initialized
    ) {

        return;
    }

    initializeSubscriptions();

    initializeBootTransitions();

    runTransitionQueue();

    transitionEngine.initialized =
        true;

    console.info(
        "%cTRANSITION ENGINE ONLINE",
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

function destroyTransitionEngine() {

    cleanupTransitionEngine();

    transitionEngine.initialized =
        false;

    console.info(
        "%cTRANSITION ENGINE DESTROYED",
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

    transitionEngine,

    initializeTransitionEngine,

    destroyTransitionEngine,

    fadeTransition,

    slideTransition,

    blurRevealTransition,

    queueTransition

}; 
