// FILE: /aoichan-native/scripts/engines/gesture-engine.js

import {

    setState,
    getState

} from "../state.js";

/* =========================
   GESTURE ENGINE
========================= */

const gestureEngine = {

    initialized: false,

    activeGesture: null,

    touchStart: {

        x: 0,
        y: 0

    },

    touchCurrent: {

        x: 0,
        y: 0

    },

    touchDistance: 0,

    touchDuration: 0,

    swipeThreshold: 80,

    holdThreshold: 420,

    pinchStartDistance: 0,

    pinchScale: 1,

    listeners: [],

    cleanupTasks: []

};

/* =========================
   DOM CACHE
========================= */

const dom = {

    root:
        document.getElementById(
            "portal-root"
        )

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

    gestureEngine.listeners.push({
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
        gestureEngine.listeners.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const listener =
            gestureEngine.listeners[index];

        listener.target.removeEventListener(
            listener.type,
            listener.handler,
            listener.options
        );

    }

    gestureEngine.listeners.length = 0;

}

/* =========================
   DISTANCE
========================= */

function calculateDistance(
    pointA,
    pointB
) {

    const deltaX =
        pointB.x - pointA.x;

    const deltaY =
        pointB.y - pointA.y;

    return Math.sqrt(
        (deltaX * deltaX) +
        (deltaY * deltaY)
    );

}

/* =========================
   TOUCH POINT
========================= */

function getTouchPoint(
    touch
) {

    return {

        x: touch.clientX,
        y: touch.clientY

    };

}

/* =========================
   SWIPE DETECTION
========================= */

function detectSwipeGesture() {

    const deltaX =
        gestureEngine.touchCurrent.x -
        gestureEngine.touchStart.x;

    const deltaY =
        gestureEngine.touchCurrent.y -
        gestureEngine.touchStart.y;

    const absX =
        Math.abs(deltaX);

    const absY =
        Math.abs(deltaY);

    if (
        absX <
        gestureEngine.swipeThreshold
    ) {

        return null;

    }

    if (
        absX > absY
    ) {

        return deltaX > 0
            ? "swipe-right"
            : "swipe-left";

    }

    return deltaY > 0
        ? "swipe-down"
        : "swipe-up";

}

/* =========================
   PANEL SWIPE
========================= */

function handlePanelSwipe(
    gesture
) {

    const currentPanel =
        getState(
            "system.activePanel"
        );

    const panels = [

        "home",
        "explorer",
        "media",
        "settings"

    ];

    const currentIndex =
        panels.indexOf(
            currentPanel
        );

    if (
        currentIndex === -1
    ) {

        return;

    }

    if (
        gesture === "swipe-left"
    ) {

        const next =
            panels[
                Math.min(
                    currentIndex + 1,
                    panels.length - 1
                )
            ];

        setState(
            "system.activePanel",
            next
        );

    }

    if (
        gesture === "swipe-right"
    ) {

        const previous =
            panels[
                Math.max(
                    currentIndex - 1,
                    0
                )
            ];

        setState(
            "system.activePanel",
            previous
        );

    }

}

/* =========================
   HOLD DETECTION
========================= */

function detectHoldGesture() {

    const elapsed =
        Date.now() -
        gestureEngine.touchDuration;

    if (
        elapsed >=
        gestureEngine.holdThreshold
    ) {

        return true;

    }

    return false;

}

/* =========================
   PINCH SCALE
========================= */

function updatePinchScale(
    touches
) {

    if (
        touches.length < 2
    ) {

        return;
    }

    const first =
        getTouchPoint(
            touches[0]
        );

    const second =
        getTouchPoint(
            touches[1]
        );

    const currentDistance =
        calculateDistance(
            first,
            second
        );

    if (
        gestureEngine.pinchStartDistance === 0
    ) {

        gestureEngine.pinchStartDistance =
            currentDistance;

    }

    const scale =
        currentDistance /
        gestureEngine.pinchStartDistance;

    gestureEngine.pinchScale =
        scale;

    setState(
        "gesture.pinchScale",
        scale
    );

}

/* =========================
   TOUCH START
========================= */

function handleTouchStart(
    event
) {

    const touches =
        event.touches;

    if (
        touches.length === 1
    ) {

        const point =
            getTouchPoint(
                touches[0]
            );

        gestureEngine.touchStart =
            point;

        gestureEngine.touchCurrent =
            point;

        gestureEngine.touchDuration =
            Date.now();

        gestureEngine.activeGesture =
            "touch";

    }

    if (
        touches.length === 2
    ) {

        gestureEngine.activeGesture =
            "pinch";

        updatePinchScale(
            touches
        );

    }

    setState(
        "gesture.active",
        true
    );

}

/* =========================
   TOUCH MOVE
========================= */

function handleTouchMove(
    event
) {

    const touches =
        event.touches;

    if (
        gestureEngine.activeGesture ===
        "touch"
    ) {

        const point =
            getTouchPoint(
                touches[0]
            );

        gestureEngine.touchCurrent =
            point;

    }

    if (
        gestureEngine.activeGesture ===
        "pinch"
    ) {

        updatePinchScale(
            touches
        );

    }

}

/* =========================
   TOUCH END
========================= */

function handleTouchEnd() {

    const swipe =
        detectSwipeGesture();

    if (swipe) {

        handlePanelSwipe(
            swipe
        );

        setState(
            "gesture.last",
            swipe
        );

    }

    const held =
        detectHoldGesture();

    if (held) {

        setState(
            "gesture.last",
            "hold"
        );

    }

    gestureEngine.activeGesture =
        null;

    gestureEngine.pinchScale = 1;

    gestureEngine.pinchStartDistance = 0;

    setState(
        "gesture.active",
        false
    );

}

/* =========================
   DOUBLE TAP
========================= */

let lastTap = 0;

function handleDoubleTap() {

    const now =
        Date.now();

    const delta =
        now - lastTap;

    if (
        delta < 280 &&
        delta > 0
    ) {

        setState(
            "gesture.last",
            "double-tap"
        );

        dom.root?.classList.toggle(
            "portal-focus-mode"
        );

    }

    lastTap = now;

}

/* =========================
   TOUCH EVENTS
========================= */

function initializeTouchEvents() {

    registerListener(
        window,
        "touchstart",
        function handleStart(event) {

            handleTouchStart(
                event
            );

            handleDoubleTap();

        },
        {
            passive: true
        }
    );

    registerListener(
        window,
        "touchmove",
        handleTouchMove,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "touchend",
        handleTouchEnd,
        {
            passive: true
        }
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupGestureEngine() {

    const total =
        gestureEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            gestureEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[GESTURE CLEANUP ERROR]",
                error
            );

        }

    }

    gestureEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeGestureEngine() {

    if (
        gestureEngine.initialized
    ) {

        return;
    }

    initializeTouchEvents();

    gestureEngine.initialized =
        true;

    console.info(
        "%cGESTURE ENGINE ONLINE",
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

function destroyGestureEngine() {

    removeAllListeners();

    cleanupGestureEngine();

    gestureEngine.activeGesture =
        null;

    gestureEngine.initialized =
        false;

    console.info(
        "%cGESTURE ENGINE DESTROYED",
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

    gestureEngine,

    initializeGestureEngine,

    destroyGestureEngine

}; 
