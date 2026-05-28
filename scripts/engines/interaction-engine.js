// FILE: /aoichan-native/scripts/engines/interaction-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

/* =========================
   INTERACTION ENGINE
========================= */

const interactionEngine = {

    initialized: false,

    hoveredElement: null,

    focusedElement: null,

    activeRipplePool: [],

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

    interactionEngine.listeners.push({
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
        interactionEngine.listeners.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const listener =
            interactionEngine.listeners[index];

        listener.target.removeEventListener(
            listener.type,
            listener.handler,
            listener.options
        );

    }

    interactionEngine.listeners.length = 0;

}

/* =========================
   INTERACTIVE CHECK
========================= */

function isInteractiveElement(
    element
) {

    if (!element) {
        return false;
    }

    return Boolean(

        element.closest(
            [
                "button",
                "a",
                "input",
                "textarea",
                "select",
                "[data-interactive]",
                ".sidebar-button",
                ".glass-button"
            ].join(",")
        )

    );

}

/* =========================
   CURSOR MODE
========================= */

function updateCursorMode(
    mode
) {

    if (!dom.root) {
        return;
    }

    dom.root.dataset.cursor =
        mode;

}

/* =========================
   POINTER ENTER
========================= */

function handlePointerOver(
    event
) {

    const target =
        event.target;

    const interactive =
        isInteractiveElement(
            target
        );

    if (!interactive) {

        updateCursorMode(
            "default"
        );

        return;

    }

    interactionEngine.hoveredElement =
        target;

    updateCursorMode(
        "interactive"
    );

}

/* =========================
   POINTER LEAVE
========================= */

function handlePointerOut() {

    interactionEngine.hoveredElement =
        null;

    updateCursorMode(
        "default"
    );

}

/* =========================
   FOCUS TRACK
========================= */

function handleFocusIn(
    event
) {

    interactionEngine.focusedElement =
        event.target;

    setState(
        "interaction.focused",
        true
    );

}

/* =========================
   BLUR TRACK
========================= */

function handleFocusOut() {

    interactionEngine.focusedElement =
        null;

    setState(
        "interaction.focused",
        false
    );

}

/* =========================
   RIPPLE NODE
========================= */

function createRippleNode(
    x,
    y
) {

    const ripple =
        document.createElement("span");

    ripple.className =
        "interaction-ripple";

    ripple.style.left =
        `${x}px`;

    ripple.style.top =
        `${y}px`;

    return ripple;

}

/* =========================
   RIPPLE EFFECT
========================= */

function spawnRipple(
    event
) {

    const target =
        event.target.closest(
            ".glass-button, .sidebar-button"
        );

    if (!target) {
        return;
    }

    const bounds =
        target.getBoundingClientRect();

    const ripple =
        createRippleNode(
            event.clientX - bounds.left,
            event.clientY - bounds.top
        );

    target.appendChild(
        ripple
    );

    interactionEngine.activeRipplePool.push(
        ripple
    );

    window.setTimeout(
        function removeRipple() {

            ripple.remove();

        },
        800
    );

}

/* =========================
   KEYBOARD NAVIGATION
========================= */

function handleKeyboardNavigation(
    event
) {

    const key =
        event.key;

    if (
        key === "Escape"
    ) {

        setState(
            "system.activePanel",
            "home"
        );

    }

    if (
        key === "Tab"
    ) {

        dom.root?.classList.add(
            "keyboard-navigation"
        );

    }

}

/* =========================
   POINTER DOWN
========================= */

function handlePointerDown(
    event
) {

    spawnRipple(
        event
    );

    setState(
        "interaction.pointerDown",
        true
    );

}

/* =========================
   POINTER UP
========================= */

function handlePointerUp() {

    setState(
        "interaction.pointerDown",
        false
    );

}

/* =========================
   CONTEXT MENU
========================= */

function handleContextMenu(
    event
) {

    const customBlocked =
        event.target.closest(
            "[data-disable-context]"
        );

    if (!customBlocked) {
        return;
    }

    event.preventDefault();

}

/* =========================
   TOUCH DETECTION
========================= */

function initializeTouchDetection() {

    const touchEnabled =
        (
            "ontouchstart" in window
        ) ||
        navigator.maxTouchPoints > 0;

    setState(
        "interaction.touch",
        touchEnabled
    );

    if (
        touchEnabled &&
        dom.root
    ) {

        dom.root.dataset.touch =
            "true";

    }

}

/* =========================
   INTERACTION EVENTS
========================= */

function initializeInteractionEvents() {

    registerListener(
        window,
        "pointerover",
        handlePointerOver,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "pointerout",
        handlePointerOut,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "focusin",
        handleFocusIn,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "focusout",
        handleFocusOut,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "pointerdown",
        handlePointerDown,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "pointerup",
        handlePointerUp,
        {
            passive: true
        }
    );

    registerListener(
        window,
        "keydown",
        handleKeyboardNavigation
    );

    registerListener(
        window,
        "contextmenu",
        handleContextMenu
    );

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const unsubscribe =
        subscribeState(
            "system.activePanel",
            function syncPanel(panel) {

                if (!dom.root) {
                    return;
                }

                dom.root.dataset.panel =
                    panel;

            }
        );

    interactionEngine.cleanupTasks.push(
        unsubscribe
    );

}

/* =========================
   CLEANUP RIPPLES
========================= */

function cleanupRipples() {

    const total =
        interactionEngine.activeRipplePool.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const ripple =
            interactionEngine.activeRipplePool[index];

        ripple.remove();

    }

    interactionEngine.activeRipplePool.length = 0;

}

/* =========================
   CLEANUP
========================= */

function cleanupInteractionEngine() {

    const total =
        interactionEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            interactionEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[INTERACTION CLEANUP ERROR]",
                error
            );

        }

    }

    interactionEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeInteractionEngine() {

    if (
        interactionEngine.initialized
    ) {

        return;
    }

    initializeTouchDetection();

    initializeInteractionEvents();

    initializeSubscriptions();

    interactionEngine.initialized =
        true;

    console.info(
        "%cINTERACTION ENGINE ONLINE",
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

function destroyInteractionEngine() {

    removeAllListeners();

    cleanupRipples();

    cleanupInteractionEngine();

    interactionEngine.hoveredElement =
        null;

    interactionEngine.focusedElement =
        null;

    interactionEngine.initialized =
        false;

    console.info(
        "%cINTERACTION ENGINE DESTROYED",
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

    interactionEngine,

    initializeInteractionEngine,

    destroyInteractionEngine

}; 
