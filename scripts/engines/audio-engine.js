// FILE: /aoichan-native/scripts/engines/audio-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

/* =========================
   AUDIO ENGINE
========================= */

const audioEngine = {

    initialized: false,

    context: null,

    masterGain: null,

    ambientGain: null,

    uiGain: null,

    analyser: null,

    frequencyData: null,

    activeNodes: new Set(),

    cleanupTasks: []

};

/* =========================
   AUDIO CONTEXT
========================= */

function createAudioContext() {

    const Context =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!Context) {

        console.warn(
            "[AUDIO ENGINE] WebAudio Unsupported"
        );

        return null;

    }

    return new Context();

}

/* =========================
   MASTER CHAIN
========================= */

function buildAudioChain() {

    if (
        !audioEngine.context
    ) {

        return;
    }

    const context =
        audioEngine.context;

    audioEngine.masterGain =
        context.createGain();

    audioEngine.ambientGain =
        context.createGain();

    audioEngine.uiGain =
        context.createGain();

    audioEngine.analyser =
        context.createAnalyser();

    audioEngine.analyser.fftSize =
        256;

    audioEngine.frequencyData =
        new Uint8Array(
            audioEngine.analyser.frequencyBinCount
        );

    audioEngine.masterGain.gain.value =
        0.8;

    audioEngine.ambientGain.gain.value =
        0.45;

    audioEngine.uiGain.gain.value =
        0.6;

    audioEngine.ambientGain.connect(
        audioEngine.masterGain
    );

    audioEngine.uiGain.connect(
        audioEngine.masterGain
    );

    audioEngine.masterGain.connect(
        audioEngine.analyser
    );

    audioEngine.analyser.connect(
        context.destination
    );

}

/* =========================
   RESUME AUDIO
========================= */

async function resumeAudioContext() {

    if (
        !audioEngine.context
    ) {

        return;
    }

    if (
        audioEngine.context.state ===
        "suspended"
    ) {

        await audioEngine.context.resume();

    }

}

/* =========================
   TONE GENERATOR
========================= */

function createOscillatorTone(
    frequency = 440,
    duration = 0.12,
    volume = 0.08,
    type = "sine"
) {

    if (
        !audioEngine.context
    ) {

        return;
    }

    const context =
        audioEngine.context;

    const oscillator =
        context.createOscillator();

    const gain =
        context.createGain();

    oscillator.type =
        type;

    oscillator.frequency.value =
        frequency;

    gain.gain.value =
        volume;

    oscillator.connect(
        gain
    );

    gain.connect(
        audioEngine.uiGain
    );

    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + duration
    );

    oscillator.stop(
        context.currentTime + duration
    );

    audioEngine.activeNodes.add(
        oscillator
    );

}

/* =========================
   UI CLICK SOUND
========================= */

function playUIClick() {

    createOscillatorTone(
        420,
        0.08,
        0.03,
        "triangle"
    );

}

/* =========================
   UI HOVER SOUND
========================= */

function playUIHover() {

    createOscillatorTone(
        620,
        0.04,
        0.015,
        "sine"
    );

}

/* =========================
   PANEL TRANSITION SOUND
========================= */

function playPanelTransition() {

    createOscillatorTone(
        240,
        0.18,
        0.04,
        "sawtooth"
    );

    createOscillatorTone(
        480,
        0.12,
        0.02,
        "triangle"
    );

}

/* =========================
   AMBIENT DRONE
========================= */

function createAmbientDrone() {

    if (
        !audioEngine.context
    ) {

        return;
    }

    const context =
        audioEngine.context;

    const oscillator =
        context.createOscillator();

    const gain =
        context.createGain();

    oscillator.type =
        "sine";

    oscillator.frequency.value =
        52;

    gain.gain.value =
        0.0001;

    oscillator.connect(
        gain
    );

    gain.connect(
        audioEngine.ambientGain
    );

    oscillator.start();

    gain.gain.linearRampToValueAtTime(
        0.012,
        context.currentTime + 4
    );

    audioEngine.activeNodes.add(
        oscillator
    );

}

/* =========================
   FREQUENCY ANALYSIS
========================= */

function updateFrequencyData() {

    if (
        !audioEngine.analyser
    ) {

        return null;
    }

    audioEngine.analyser.getByteFrequencyData(
        audioEngine.frequencyData
    );

    return audioEngine.frequencyData;

}

/* =========================
   AVERAGE FREQUENCY
========================= */

function getAverageFrequency() {

    const data =
        updateFrequencyData();

    if (!data) {

        return 0;

    }

    let total = 0;

    const length =
        data.length;

    for (
        let index = 0;
        index < length;
        index += 1
    ) {

        total += data[index];

    }

    return (
        total / length
    );

}

/* =========================
   AUDIO REACTIVE STATE
========================= */

function updateReactiveAudioState() {

    const average =
        getAverageFrequency();

    setState(
        "audio.reactiveLevel",
        average
    );

}

/* =========================
   AUDIO LOOP
========================= */

function initializeAudioLoop() {

    function loop() {

        updateReactiveAudioState();

        window.requestAnimationFrame(
            loop
        );

    }

    loop();

}

/* =========================
   GLOBAL INTERACTION
========================= */

function initializeGlobalAudioEvents() {

    const clickHandler =
        async function handleClick() {

            await resumeAudioContext();

            playUIClick();

        };

    const hoverHandler =
        function handleHover(event) {

            const interactive =
                event.target.closest(
                    ".glass-button, .sidebar-button"
                );

            if (!interactive) {

                return;
            }

            playUIHover();

        };

    window.addEventListener(
        "pointerdown",
        clickHandler,
        {
            passive: true
        }
    );

    window.addEventListener(
        "pointerover",
        hoverHandler,
        {
            passive: true
        }
    );

    audioEngine.cleanupTasks.push(
        function cleanupAudioEvents() {

            window.removeEventListener(
                "pointerdown",
                clickHandler
            );

            window.removeEventListener(
                "pointerover",
                hoverHandler
            );

        }
    );

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const unsubscribe =
        subscribeState(
            "system.activePanel",
            playPanelTransition
        );

    audioEngine.cleanupTasks.push(
        unsubscribe
    );

}

/* =========================
   VOLUME CONTROL
========================= */

function setMasterVolume(
    value
) {

    if (
        !audioEngine.masterGain
    ) {

        return;
    }

    const normalized =
        Math.min(
            Math.max(value, 0),
            1
        );

    audioEngine.masterGain.gain.value =
        normalized;

    setState(
        "audio.masterVolume",
        normalized
    );

}

/* =========================
   CLEANUP NODES
========================= */

function cleanupAudioNodes() {

    audioEngine.activeNodes.forEach(
        function stopNode(node) {

            try {

                node.stop();

            } catch (error) {

                console.warn(
                    "[AUDIO NODE CLEANUP]",
                    error
                );

            }

        }
    );

    audioEngine.activeNodes.clear();

}

/* =========================
   CLEANUP
========================= */

function cleanupAudioEngine() {

    const total =
        audioEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            audioEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[AUDIO CLEANUP ERROR]",
                error
            );

        }

    }

    audioEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

async function initializeAudioEngine() {

    if (
        audioEngine.initialized
    ) {

        return;
    }

    audioEngine.context =
        createAudioContext();

    buildAudioChain();

    createAmbientDrone();

    initializeGlobalAudioEvents();

    initializeSubscriptions();

    initializeAudioLoop();

    audioEngine.initialized =
        true;

    console.info(
        "%cAUDIO ENGINE ONLINE",
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

async function destroyAudioEngine() {

    cleanupAudioEngine();

    cleanupAudioNodes();

    if (
        audioEngine.context
    ) {

        await audioEngine.context.close();

    }

    audioEngine.context =
        null;

    audioEngine.initialized =
        false;

    console.info(
        "%cAUDIO ENGINE DESTROYED",
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

    audioEngine,

    initializeAudioEngine,

    destroyAudioEngine,

    setMasterVolume,

    playUIClick,

    playUIHover,

    playPanelTransition,

    getAverageFrequency

}; 
