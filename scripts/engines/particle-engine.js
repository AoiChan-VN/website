// FILE: /aoichan-native/scripts/engines/particle-engine.js

import {

    getState

} from "../state.js";

import {

    registerTimeline

} from "./animation-engine.js";

/* =========================
   PARTICLE ENGINE
========================= */

const particleEngine = {

    initialized: false,

    particles: [],

    particleCount: 120,

    canvas: null,

    context: null,

    width: 0,

    height: 0,

    cleanupTasks: []

};

/* =========================
   DOM CACHE
========================= */

const dom = {

    layer:
        document.getElementById(
            "portal-particle-layer"
        )

};

/* =========================
   RANDOM RANGE
========================= */

function randomRange(
    min,
    max
) {

    return (
        Math.random() *
        (max - min) +
        min
    );

}

/* =========================
   CREATE PARTICLE
========================= */

function createParticle() {

    return {

        x:
            randomRange(
                0,
                particleEngine.width
            ),

        y:
            randomRange(
                0,
                particleEngine.height
            ),

        size:
            randomRange(
                0.6,
                3.4
            ),

        speedX:
            randomRange(
                -0.12,
                0.12
            ),

        speedY:
            randomRange(
                -0.08,
                0.08
            ),

        alpha:
            randomRange(
                0.12,
                0.8
            ),

        pulse:
            randomRange(
                0,
                Math.PI * 2
            ),

        depth:
            randomRange(
                0.4,
                1.8
            )

    };

}

/* =========================
   CREATE CANVAS
========================= */

function createCanvas() {

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.className =
        "portal-particle-canvas";

    return canvas;

}

/* =========================
   RESIZE
========================= */

function resizeCanvas() {

    if (
        !particleEngine.canvas
    ) {

        return;
    }

    particleEngine.width =
        window.innerWidth;

    particleEngine.height =
        window.innerHeight;

    particleEngine.canvas.width =
        particleEngine.width;

    particleEngine.canvas.height =
        particleEngine.height;

}

/* =========================
   INITIALIZE PARTICLES
========================= */

function initializeParticles() {

    particleEngine.particles.length = 0;

    for (
        let index = 0;
        index <
        particleEngine.particleCount;
        index += 1
    ) {

        particleEngine.particles.push(
            createParticle()
        );

    }

}

/* =========================
   UPDATE PARTICLE
========================= */

function updateParticle(
    particle,
    timestamp
) {

    const reactive =
        (
            getState(
                "audio.reactiveLevel"
            ) || 0
        ) / 255;

    particle.x +=
        particle.speedX *
        particle.depth *
        (
            1 +
            reactive * 2
        );

    particle.y +=
        particle.speedY *
        particle.depth *
        (
            1 +
            reactive
        );

    particle.pulse +=
        0.01 +
        reactive * 0.03;

    if (
        particle.x <
        -20
    ) {

        particle.x =
            particleEngine.width + 20;

    }

    if (
        particle.x >
        particleEngine.width + 20
    ) {

        particle.x = -20;

    }

    if (
        particle.y <
        -20
    ) {

        particle.y =
            particleEngine.height + 20;

    }

    if (
        particle.y >
        particleEngine.height + 20
    ) {

        particle.y = -20;

    }

}

/* =========================
   DRAW PARTICLE
========================= */

function drawParticle(
    particle
) {

    const context =
        particleEngine.context;

    if (!context) {

        return;
    }

    const pulse =
        (
            Math.sin(
                particle.pulse
            ) * 0.5
        ) + 0.5;

    const radius =
        particle.size +
        pulse * 1.2;

    context.beginPath();

    context.arc(
        particle.x,
        particle.y,
        radius,
        0,
        Math.PI * 2
    );

    context.fillStyle =
        `
        rgba(
            180,
            220,
            255,
            ${particle.alpha * (0.5 + pulse * 0.5)}
        )
        `;

    context.shadowBlur =
        12 +
        pulse * 18;

    context.shadowColor =
        "rgba(120,190,255,0.45)";

    context.fill();

}

/* =========================
   CONNECTIONS
========================= */

function drawConnections() {

    const context =
        particleEngine.context;

    if (!context) {

        return;
    }

    const particles =
        particleEngine.particles;

    const maxDistance =
        120;

    for (
        let a = 0;
        a < particles.length;
        a += 1
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b += 1
        ) {

            const first =
                particles[a];

            const second =
                particles[b];

            const dx =
                first.x - second.x;

            const dy =
                first.y - second.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distance >
                maxDistance
            ) {

                continue;

            }

            const opacity =
                1 -
                (
                    distance /
                    maxDistance
                );

            context.beginPath();

            context.moveTo(
                first.x,
                first.y
            );

            context.lineTo(
                second.x,
                second.y
            );

            context.strokeStyle =
                `
                rgba(
                    160,
                    210,
                    255,
                    ${opacity * 0.08}
                )
                `;

            context.lineWidth =
                1;

            context.stroke();

        }

    }

}

/* =========================
   CLEAR FRAME
========================= */

function clearFrame() {

    const context =
        particleEngine.context;

    if (!context) {

        return;
    }

    context.clearRect(
        0,
        0,
        particleEngine.width,
        particleEngine.height
    );

}

/* =========================
   RENDER LOOP
========================= */

function renderParticles(
    timestamp
) {

    clearFrame();

    drawConnections();

    const total =
        particleEngine.particles.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const particle =
            particleEngine.particles[index];

        updateParticle(
            particle,
            timestamp
        );

        drawParticle(
            particle
        );

    }

}

/* =========================
   TIMELINE
========================= */

function initializeParticleTimeline() {

    registerTimeline(
        "particle-engine-loop",
        renderParticles
    );

}

/* =========================
   RESIZE EVENTS
========================= */

function initializeResizeEvents() {

    const resizeHandler =
        function handleResize() {

            resizeCanvas();

            initializeParticles();

        };

    window.addEventListener(
        "resize",
        resizeHandler,
        {
            passive: true
        }
    );

    particleEngine.cleanupTasks.push(
        function cleanupResize() {

            window.removeEventListener(
                "resize",
                resizeHandler
            );

        }
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

    particleEngine.particleCount =
        36;

}

/* =========================
   CLEANUP
========================= */

function cleanupParticleEngine() {

    const total =
        particleEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            particleEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[PARTICLE CLEANUP ERROR]",
                error
            );

        }

    }

    particleEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeParticleEngine() {

    if (
        particleEngine.initialized
    ) {

        return;
    }

    applyReducedMotionMode();

    particleEngine.canvas =
        createCanvas();

    particleEngine.context =
        particleEngine.canvas.getContext(
            "2d"
        );

    resizeCanvas();

    initializeParticles();

    dom.layer?.appendChild(
        particleEngine.canvas
    );

    initializeParticleTimeline();

    initializeResizeEvents();

    particleEngine.initialized =
        true;

    console.info(
        "%cPARTICLE ENGINE ONLINE",
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

function destroyParticleEngine() {

    cleanupParticleEngine();

    particleEngine.particles.length = 0;

    particleEngine.canvas?.remove();

    particleEngine.canvas =
        null;

    particleEngine.context =
        null;

    particleEngine.initialized =
        false;

    console.info(
        "%cPARTICLE ENGINE DESTROYED",
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

    particleEngine,

    initializeParticleEngine,

    destroyParticleEngine

}; 
