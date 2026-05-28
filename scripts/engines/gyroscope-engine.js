// FILE: /aoichan-native/scripts/engines/gyroscope-engine.js

import {

    getState,
    setState,
    syncGyroscopeState

} from "../state.js";

/* =========================
   GYROSCOPE ENGINE
========================= */

const gyroscopeEngine = {

    initialized: false,

    enabled: false,

    supported: false,

    permissionGranted: false,

    smoothing: 0.12,

    current: {

        beta: 0,
        gamma: 0

    },

    target: {

        beta: 0,
        gamma: 0

    },

    listeners: [],

    cleanupTasks: []

};

/* =========================
   SUPPORT CHECK
========================= */

function detectGyroscopeSupport() {

    const supported =
        typeof DeviceOrientationEvent !==
        "undefined";

    gyroscopeEngine.supported =
        supported;

    return supported;

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

    gyroscopeEngine.listeners.push({
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
        gyroscopeEngine.listeners.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const listener =
            gyroscopeEngine.listeners[index];

        listener.target.removeEventListener(
            listener.type,
            listener.handler,
            listener.options
        );

    }

    gyroscopeEngine.listeners.length = 0;

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
   MOTION EVENT
========================= */

function handleDeviceOrientation(
    event
) {

    const beta =
        Number(event.beta) || 0;

    const gamma =
        Number(event.gamma) || 0;

    gyroscopeEngine.target.beta =
        clamp(beta, -45, 45);

    gyroscopeEngine.target.gamma =
        clamp(gamma, -45, 45);

}

/* =========================
   SMOOTH UPDATE
========================= */

function smoothGyroscopeMotion() {

    gyroscopeEngine.current.beta =
        lerp(
            gyroscopeEngine.current.beta,
            gyroscopeEngine.target.beta,
            gyroscopeEngine.smoothing
        );

    gyroscopeEngine.current.gamma =
        lerp(
            gyroscopeEngine.current.gamma,
            gyroscopeEngine.target.gamma,
            gyroscopeEngine.smoothing
        );

}

/* =========================
   PUSH STATE
========================= */

function updateGyroscopeState() {

    syncGyroscopeState({

        beta:
            gyroscopeEngine.current.beta,

        gamma:
            gyroscopeEngine.current.gamma,

        enabled:
            gyroscopeEngine.enabled

    });

}

/* =========================
   ENGINE LOOP
========================= */

function gyroscopeLoop() {

    if (
        !gyroscopeEngine.enabled
    ) {

        return;
    }

    smoothGyroscopeMotion();

    updateGyroscopeState();

    window.requestAnimationFrame(
        gyroscopeLoop
    );

}

/* =========================
   IOS PERMISSION
========================= */

async function requestIOSPermission() {

    const requiresPermission =
        typeof DeviceOrientationEvent !==
        "undefined" &&
        typeof DeviceOrientationEvent
            .requestPermission ===
            "function";

    if (!requiresPermission) {

        gyroscopeEngine.permissionGranted =
            true;

        return true;

    }

    try {

        const permission =
            await DeviceOrientationEvent
                .requestPermission();

        const granted =
            permission === "granted";

        gyroscopeEngine.permissionGranted =
            granted;

        return granted;

    } catch (error) {

        console.warn(
            "[GYROSCOPE PERMISSION ERROR]",
            error
        );

        return false;

    }

}

/* =========================
   START ENGINE
========================= */

async function startGyroscopeEngine() {

    if (
        gyroscopeEngine.enabled
    ) {

        return true;

    }

    const supported =
        detectGyroscopeSupport();

    if (!supported) {

        console.warn(
            "[GYROSCOPE] Unsupported Device"
        );

        setState(
            "gyroscope.enabled",
            false
        );

        return false;

    }

    const permissionGranted =
        await requestIOSPermission();

    if (!permissionGranted) {

        console.warn(
            "[GYROSCOPE] Permission Denied"
        );

        setState(
            "gyroscope.enabled",
            false
        );

        return false;

    }

    registerListener(
        window,
        "deviceorientation",
        handleDeviceOrientation,
        {
            passive: true
        }
    );

    gyroscopeEngine.enabled =
        true;

    setState(
        "gyroscope.enabled",
        true
    );

    gyroscopeLoop();

    console.info(
        "%cGYROSCOPE ENGINE ACTIVE",
        [
            "color:#79f2ff",
            "font-weight:700"
        ].join(";")
    );

    return true;

}

/* =========================
   STOP ENGINE
========================= */

function stopGyroscopeEngine() {

    gyroscopeEngine.enabled =
        false;

    gyroscopeEngine.current.beta = 0;
    gyroscopeEngine.current.gamma = 0;

    gyroscopeEngine.target.beta = 0;
    gyroscopeEngine.target.gamma = 0;

    syncGyroscopeState({

        beta: 0,
        gamma: 0,
        enabled: false

    });

    removeAllListeners();

    console.info(
        "%cGYROSCOPE ENGINE STOPPED",
        [
            "color:#ff7a7a",
            "font-weight:700"
        ].join(";")
    );

}

/* =========================
   AUTO ENABLE
========================= */

async function autoInitializeGyroscope() {

    const reducedMotion =
        getState(
            "system.reducedMotion"
        );

    if (reducedMotion) {

        return;
    }

    await startGyroscopeEngine();

}

/* =========================
   CLEANUP
========================= */

function cleanupGyroscopeEngine() {

    const total =
        gyroscopeEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            gyroscopeEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[GYROSCOPE CLEANUP ERROR]",
                error
            );

        }

    }

    gyroscopeEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

async function initializeGyroscopeEngine() {

    if (
        gyroscopeEngine.initialized
    ) {

        return;
    }

    detectGyroscopeSupport();

    await autoInitializeGyroscope();

    gyroscopeEngine.initialized =
        true;

    console.info(
        "%cGYROSCOPE ENGINE ONLINE",
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

function destroyGyroscopeEngine() {

    stopGyroscopeEngine();

    cleanupGyroscopeEngine();

    gyroscopeEngine.initialized =
        false;

    gyroscopeEngine.permissionGranted =
        false;

    console.info(
        "%cGYROSCOPE ENGINE DESTROYED",
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

    gyroscopeEngine,

    initializeGyroscopeEngine,

    destroyGyroscopeEngine,

    startGyroscopeEngine,

    stopGyroscopeEngine

}; 
