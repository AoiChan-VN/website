// FILE: /aoichan-native/scripts/engines/ambient-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

import {

    registerTimeline

} from "./animation-engine.js";

import {

    getAverageFrequency

} from "./audio-engine.js";

/* =========================
   AMBIENT ENGINE
========================= */

const ambientEngine = {

    initialized: false,

    activeTheme: "nebula",

    reactiveIntensity: 0,

    ambientTick: 0,

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

    ambientLayer:
        document.getElementById(
            "portal-ambient-layer"
        ),

    glowLayer:
        document.getElementById(
            "portal-glow-layer"
        )

};

/* =========================
   THEMES
========================= */

const themes = {

    nebula: {

        hue: 210,
        saturation: 90,
        glow: 0.7

    },

    eclipse: {

        hue: 280,
        saturation: 70,
        glow: 0.45

    },

    aurora: {

        hue: 160,
        saturation: 88,
        glow: 0.82

    },

    solaris: {

        hue: 32,
        saturation: 95,
        glow: 0.9

    }

};

/* =========================
   APPLY CSS VARIABLE
========================= */

function setAmbientVariable(
    key,
    value
) {

    if (!dom.root) {
        return;
    }

    dom.root.style.setProperty(
        key,
        value
    );

}

/* =========================
   APPLY THEME
========================= */

function applyAmbientTheme(
    themeName
) {

    const theme =
        themes[themeName];

    if (!theme) {

        return;
    }

    ambientEngine.activeTheme =
        themeName;

    setAmbientVariable(
        "--ambient-hue",
        theme.hue
    );

    setAmbientVariable(
        "--ambient-saturation",
        `${theme.saturation}%`
    );

    setAmbientVariable(
        "--ambient-glow",
        theme.glow
    );

    setState(
        "ambient.theme",
        themeName
    );

}

/* =========================
   REACTIVE GLOW
========================= */

function updateReactiveGlow() {

    const frequency =
        getAverageFrequency();

    const normalized =
        Math.min(
            frequency / 120,
            1
        );

    ambientEngine.reactiveIntensity =
        normalized;

    setAmbientVariable(
        "--ambient-reactive-scale",
        (
            1 +
            normalized * 0.28
        ).toFixed(3)
    );

    setAmbientVariable(
        "--ambient-reactive-opacity",
        (
            0.4 +
            normalized * 0.6
        ).toFixed(3)
    );

    setState(
        "ambient.reactive",
        normalized
    );

}

/* =========================
   PARALLAX AMBIENT
========================= */

function updateAmbientParallax() {

    const mouseX =
        getState(
            "mouse.x"
        ) || 0;

    const mouseY =
        getState(
            "mouse.y"
        ) || 0;

    const offsetX =
        (
            mouseX * 0.008
        ).toFixed(2);

    const offsetY =
        (
            mouseY * 0.008
        ).toFixed(2);

    if (
        dom.ambientLayer
    ) {

        dom.ambientLayer.style.transform =
            `
            translate3d(
                ${offsetX}px,
                ${offsetY}px,
                0
            )
            scale(
                var(--ambient-reactive-scale, 1)
            )
            `;
    }

}

/* =========================
   ATMOSPHERIC PULSE
========================= */

function updateAtmosphericPulse(
    timestamp
) {

    ambientEngine.ambientTick =
        timestamp * 0.001;

    const pulse =
        (
            Math.sin(
                ambientEngine.ambientTick
            ) * 0.5
        ) + 0.5;

    setAmbientVariable(
        "--ambient-pulse",
        pulse.toFixed(3)
    );

}

/* =========================
   GLOW ROTATION
========================= */

function updateGlowRotation(
    timestamp
) {

    if (
        !dom.glowLayer
    ) {

        return;
    }

    const angle =
        (
            timestamp * 0.002
        ) % 360;

    dom.glowLayer.style.transform =
        `rotate(${angle}deg)`;

}

/* =========================
   ACTIVE PANEL AMBIENCE
========================= */

function syncPanelTheme(
    panel
) {

    switch (panel) {

        case "media":

            applyAmbientTheme(
                "aurora"
            );

            break;

        case "settings":

            applyAmbientTheme(
                "eclipse"
            );

            break;

        case "explorer":

            applyAmbientTheme(
                "solaris"
            );

            break;

        default:

            applyAmbientTheme(
                "nebula"
            );

            break;

    }

}

/* =========================
   TIMELINE LOOP
========================= */

function initializeAmbientTimeline() {

    registerTimeline(
        "ambient-engine-loop",
        function ambientLoop(timestamp) {

            updateAtmosphericPulse(
                timestamp
            );

            updateReactiveGlow();

            updateAmbientParallax();

            updateGlowRotation(
                timestamp
            );

        }
    );

}

/* =========================
   BACKGROUND NOISE
========================= */

function initializeNoiseField() {

    if (
        !dom.ambientLayer
    ) {

        return;
    }

    const noise =
        document.createElement(
            "div"
        );

    noise.className =
        "ambient-noise-field";

    dom.ambientLayer.appendChild(
        noise
    );

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const panelSubscription =
        subscribeState(
            "system.activePanel",
            syncPanelTheme
        );

    ambientEngine.cleanupTasks.push(
        panelSubscription
    );

}

/* =========================
   REDUCED MOTION
========================= */

function applyReducedMotionMode() {

    const reduced =
        getState(
            "system.reducedMotion"
        );

    if (!reduced) {

        return;
    }

    setAmbientVariable(
        "--ambient-pulse",
        "0"
    );

    setAmbientVariable(
        "--ambient-reactive-scale",
        "1"
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupAmbientEngine() {

    const total =
        ambientEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            ambientEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[AMBIENT CLEANUP ERROR]",
                error
            );

        }

    }

    ambientEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeAmbientEngine() {

    if (
        ambientEngine.initialized
    ) {

        return;
    }

    initializeNoiseField();

    initializeAmbientTimeline();

    initializeSubscriptions();

    applyAmbientTheme(
        "nebula"
    );

    applyReducedMotionMode();

    ambientEngine.initialized =
        true;

    console.info(
        "%cAMBIENT ENGINE ONLINE",
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

function destroyAmbientEngine() {

    cleanupAmbientEngine();

    ambientEngine.initialized =
        false;

    console.info(
        "%cAMBIENT ENGINE DESTROYED",
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

    ambientEngine,

    initializeAmbientEngine,

    destroyAmbientEngine,

    applyAmbientTheme

}; 
