// FILE: /aoichan-native/scripts/engines/shader-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

import {

    registerTimeline

} from "./animation-engine.js";

/* =========================
   SHADER ENGINE
========================= */

const shaderEngine = {

    initialized: false,

    canvas: null,

    context: null,

    width: 0,

    height: 0,

    time: 0,

    mouse: {

        x: 0,
        y: 0

    },

    cleanupTasks: []

};

/* =========================
   DOM CACHE
========================= */

const dom = {

    layer:
        document.getElementById(
            "portal-shader-layer"
        )

};

/* =========================
   CREATE CANVAS
========================= */

function createShaderCanvas() {

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.className =
        "portal-shader-canvas";

    return canvas;

}

/* =========================
   RESIZE
========================= */

function resizeShaderCanvas() {

    if (
        !shaderEngine.canvas
    ) {

        return;
    }

    shaderEngine.width =
        window.innerWidth;

    shaderEngine.height =
        window.innerHeight;

    shaderEngine.canvas.width =
        shaderEngine.width;

    shaderEngine.canvas.height =
        shaderEngine.height;

}

/* =========================
   GRADIENT FIELD
========================= */

function renderGradientField() {

    const context =
        shaderEngine.context;

    if (!context) {

        return;
    }

    const gradient =
        context.createRadialGradient(

            shaderEngine.mouse.x,
            shaderEngine.mouse.y,
            0,

            shaderEngine.width * 0.5,
            shaderEngine.height * 0.5,
            shaderEngine.width * 0.8

        );

    const hue =
        (
            getState(
                "ambient.theme"
            ) === "aurora"
        )
            ? 170
            : (
                getState(
                    "ambient.theme"
                ) === "eclipse"
            )
                ? 285
                : 210;

    gradient.addColorStop(
        0,
        `hsla(${hue}, 100%, 70%, 0.18)`
    );

    gradient.addColorStop(
        0.5,
        `hsla(${hue + 40}, 100%, 50%, 0.08)`
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle =
        gradient;

    context.fillRect(
        0,
        0,
        shaderEngine.width,
        shaderEngine.height
    );

}

/* =========================
   STARFIELD
========================= */

function renderStarfield(
    timestamp
) {

    const context =
        shaderEngine.context;

    if (!context) {

        return;
    }

    const stars = 80;

    for (
        let index = 0;
        index < stars;
        index += 1
    ) {

        const x =
            (
                Math.sin(
                    index * 91.77
                ) * 99999
            ) % shaderEngine.width;

        const y =
            (
                Math.cos(
                    index * 17.22
                ) * 99999
            ) % shaderEngine.height;

        const pulse =
            (
                Math.sin(
                    timestamp * 0.001 +
                    index
                ) * 0.5
            ) + 0.5;

        const size =
            0.4 + pulse * 1.8;

        context.beginPath();

        context.arc(
            Math.abs(x),
            Math.abs(y),
            size,
            0,
            Math.PI * 2
        );

        context.fillStyle =
            `rgba(255,255,255,${0.15 + pulse * 0.4})`;

        context.fill();

    }

}

/* =========================
   WAVE DISTORTION
========================= */

function renderWaveDistortion(
    timestamp
) {

    const context =
        shaderEngine.context;

    if (!context) {

        return;
    }

    context.beginPath();

    const amplitude =
        18;

    const frequency =
        0.008;

    for (
        let x = 0;
        x <= shaderEngine.width;
        x += 12
    ) {

        const y =
            (
                shaderEngine.height * 0.5
            ) +
            Math.sin(
                (x * frequency) +
                (timestamp * 0.0015)
            ) * amplitude;

        if (x === 0) {

            context.moveTo(
                x,
                y
            );

        } else {

            context.lineTo(
                x,
                y
            );

        }

    }

    context.strokeStyle =
        "rgba(120,180,255,0.08)";

    context.lineWidth =
        2;

    context.stroke();

}

/* =========================
   REACTIVE BLOOM
========================= */

function renderReactiveBloom() {

    const context =
        shaderEngine.context;

    if (!context) {

        return;
    }

    const reactive =
        getState(
            "audio.reactiveLevel"
        ) || 0;

    const normalized =
        Math.min(
            reactive / 100,
            1
        );

    const radius =
        120 +
        normalized * 240;

    const bloom =
        context.createRadialGradient(

            shaderEngine.width * 0.5,
            shaderEngine.height * 0.5,
            0,

            shaderEngine.width * 0.5,
            shaderEngine.height * 0.5,
            radius

        );

    bloom.addColorStop(
        0,
        `rgba(120,200,255,${0.08 + normalized * 0.14})`
    );

    bloom.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle =
        bloom;

    context.fillRect(
        0,
        0,
        shaderEngine.width,
        shaderEngine.height
    );

}

/* =========================
   CLEAR FRAME
========================= */

function clearShaderFrame() {

    const context =
        shaderEngine.context;

    if (!context) {

        return;
    }

    context.clearRect(
        0,
        0,
        shaderEngine.width,
        shaderEngine.height
    );

}

/* =========================
   MAIN RENDER
========================= */

function renderShaderFrame(
    timestamp
) {

    shaderEngine.time =
        timestamp;

    clearShaderFrame();

    renderGradientField();

    renderReactiveBloom();

    renderWaveDistortion(
        timestamp
    );

    renderStarfield(
        timestamp
    );

}

/* =========================
   POINTER TRACK
========================= */

function handlePointerMove(
    event
) {

    shaderEngine.mouse.x =
        event.clientX;

    shaderEngine.mouse.y =
        event.clientY;

}

/* =========================
   TIMELINE
========================= */

function initializeShaderTimeline() {

    registerTimeline(
        "shader-engine-loop",
        renderShaderFrame
    );

}

/* =========================
   RESIZE EVENT
========================= */

function initializeResizeEvents() {

    const resizeHandler =
        function handleResize() {

            resizeShaderCanvas();

        };

    window.addEventListener(
        "resize",
        resizeHandler,
        {
            passive: true
        }
    );

    window.addEventListener(
        "pointermove",
        handlePointerMove,
        {
            passive: true
        }
    );

    shaderEngine.cleanupTasks.push(
        function cleanupShaderEvents() {

            window.removeEventListener(
                "resize",
                resizeHandler
            );

            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );

        }
    );

}

/* =========================
   REDUCED MOTION
========================= */

function applyReducedMotion() {

    const reduced =
        getState(
            "system.reducedMotion"
        );

    if (
        !reduced
    ) {

        return;
    }

    if (
        shaderEngine.canvas
    ) {

        shaderEngine.canvas.style.opacity =
            "0.35";

    }

}

/* =========================
   CLEANUP
========================= */

function cleanupShaderEngine() {

    const total =
        shaderEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            shaderEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[SHADER CLEANUP ERROR]",
                error
            );

        }

    }

    shaderEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeShaderEngine() {

    if (
        shaderEngine.initialized
    ) {

        return;
    }

    shaderEngine.canvas =
        createShaderCanvas();

    shaderEngine.context =
        shaderEngine.canvas.getContext(
            "2d"
        );

    resizeShaderCanvas();

    dom.layer?.appendChild(
        shaderEngine.canvas
    );

    initializeShaderTimeline();

    initializeResizeEvents();

    applyReducedMotion();

    shaderEngine.initialized =
        true;

    console.info(
        "%cSHADER ENGINE ONLINE",
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

function destroyShaderEngine() {

    cleanupShaderEngine();

    shaderEngine.canvas?.remove();

    shaderEngine.canvas =
        null;

    shaderEngine.context =
        null;

    shaderEngine.initialized =
        false;

    console.info(
        "%cSHADER ENGINE DESTROYED",
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

    shaderEngine,

    initializeShaderEngine,

    destroyShaderEngine

}; 
