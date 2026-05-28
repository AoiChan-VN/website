// FILE: /aoichan-native/scripts/state.js

const portalState = {

    system: {

        initialized: false,

        activePanel: "home",

        activeViewer: "default",

        runtimeStatus: "idle",

        reducedMotion:
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches

    },

    viewport: {

        width: window.innerWidth,

        height: window.innerHeight,

        orientation:
            window.innerWidth > window.innerHeight
                ? "landscape"
                : "portrait"

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

    ui: {

        modalOpen: false,

        notifications: [],

        sidebarCollapsed: false

    },

    viewer: {

        currentFile: null,

        currentType: null,

        loading: false,

        scrollTop: 0

    }

};

/* =========================
   STATE LISTENERS
========================= */

const portalSubscribers =
    new Map();

/* =========================
   VALIDATION
========================= */

function validateStatePath(path) {

    if (
        typeof path !== "string" ||
        path.trim() === ""
    ) {

        throw new Error(
            "[STATE] Invalid path"
        );

    }

}

/* =========================
   GET NESTED VALUE
========================= */

function getNestedValue(
    target,
    path
) {

    const keys =
        path.split(".");

    let current =
        target;

    for (
        let index = 0;
        index < keys.length;
        index += 1
    ) {

        const key =
            keys[index];

        if (
            current[key] === undefined
        ) {

            return undefined;

        }

        current =
            current[key];

    }

    return current;

}

/* =========================
   SET NESTED VALUE
========================= */

function setNestedValue(
    target,
    path,
    value
) {

    const keys =
        path.split(".");

    let current =
        target;

    for (
        let index = 0;
        index < keys.length - 1;
        index += 1
    ) {

        const key =
            keys[index];

        if (
            typeof current[key] !== "object" ||
            current[key] === null
        ) {

            current[key] = {};

        }

        current =
            current[key];

    }

    const finalKey =
        keys[keys.length - 1];

    current[finalKey] =
        value;

}

/* =========================
   SUBSCRIBE
========================= */

function subscribeState(
    path,
    callback
) {

    validateStatePath(path);

    if (
        typeof callback !== "function"
    ) {

        throw new Error(
            "[STATE] Callback must be a function"
        );

    }

    if (
        !portalSubscribers.has(path)
    ) {

        portalSubscribers.set(
            path,
            new Set()
        );

    }

    const listeners =
        portalSubscribers.get(path);

    listeners.add(callback);

    return function unsubscribeState() {

        listeners.delete(callback);

        if (
            listeners.size === 0
        ) {

            portalSubscribers.delete(path);

        }

    };

}

/* =========================
   NOTIFY
========================= */

function notifySubscribers(
    path,
    value
) {

    const listeners =
        portalSubscribers.get(path);

    if (!listeners) {
        return;
    }

    listeners.forEach(
        function executeListener(callback) {

            try {

                callback(value);

            } catch (error) {

                console.error(
                    "[STATE SUBSCRIBER ERROR]",
                    error
                );

            }

        }
    );

}

/* =========================
   SET STATE
========================= */

function setState(
    path,
    value
) {

    validateStatePath(path);

    const previousValue =
        getNestedValue(
            portalState,
            path
        );

    if (
        previousValue === value
    ) {

        return;

    }

    setNestedValue(
        portalState,
        path,
        value
    );

    notifySubscribers(
        path,
        value
    );

}

/* =========================
   GET STATE
========================= */

function getState(path) {

    validateStatePath(path);

    return getNestedValue(
        portalState,
        path
    );

}

/* =========================
   MERGE OBJECT STATE
========================= */

function mergeState(
    path,
    partialState
) {

    validateStatePath(path);

    if (
        typeof partialState !== "object" ||
        partialState === null
    ) {

        throw new Error(
            "[STATE] mergeState requires object"
        );

    }

    const current =
        getNestedValue(
            portalState,
            path
        );

    const merged =
        {
            ...current,
            ...partialState
        };

    setNestedValue(
        portalState,
        path,
        merged
    );

    notifySubscribers(
        path,
        merged
    );

}

/* =========================
   VIEWPORT UPDATE
========================= */

function syncViewportState() {

    mergeState(
        "viewport",
        {
            width: window.innerWidth,

            height: window.innerHeight,

            orientation:
                window.innerWidth >
                window.innerHeight
                    ? "landscape"
                    : "portrait"
        }
    );

}

/* =========================
   POINTER UPDATE
========================= */

function syncPointerState(
    pointerData
) {

    mergeState(
        "pointer",
        pointerData
    );

}

/* =========================
   GYROSCOPE UPDATE
========================= */

function syncGyroscopeState(
    gyroscopeData
) {

    mergeState(
        "gyroscope",
        gyroscopeData
    );

}

/* =========================
   ACTIVE PANEL
========================= */

function setActivePanel(
    panelName
) {

    if (
        typeof panelName !== "string"
    ) {

        return;

    }

    setState(
        "system.activePanel",
        panelName
    );

}

/* =========================
   VIEWER MODE
========================= */

function setViewerMode(
    viewerType
) {

    setState(
        "system.activeViewer",
        viewerType
    );

}

/* =========================
   NOTIFICATION PUSH
========================= */

function pushNotification(
    payload
) {

    const notifications =
        [
            ...portalState.ui.notifications
        ];

    notifications.push(
        {
            id:
                crypto.randomUUID(),

            timestamp:
                Date.now(),

            ...payload
        }
    );

    setState(
        "ui.notifications",
        notifications
    );

}

/* =========================
   NOTIFICATION REMOVE
========================= */

function removeNotification(
    notificationId
) {

    const filtered =
        portalState.ui.notifications.filter(
            function filterNotification(item) {

                return (
                    item.id !== notificationId
                );

            }
        );

    setState(
        "ui.notifications",
        filtered
    );

}

/* =========================
   SYSTEM INIT
========================= */

function initializeStateSystem() {

    syncViewportState();

    setState(
        "system.runtimeStatus",
        "running"
    );

    setState(
        "system.initialized",
        true
    );

    console.info(
        "%cSTATE SYSTEM INITIALIZED",
        [
            "color:#79f2ff",
            "font-weight:700"
        ].join(";")
    );

}

/* =========================
   EXPORTS
========================= */

export {

    portalState,

    getState,

    setState,

    mergeState,

    subscribeState,

    syncViewportState,

    syncPointerState,

    syncGyroscopeState,

    setActivePanel,

    setViewerMode,

    pushNotification,

    removeNotification,

    initializeStateSystem

}; 
