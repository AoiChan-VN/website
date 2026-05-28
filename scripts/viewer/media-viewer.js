// FILE: /aoichan-native/scripts/viewer/media-viewer.js

import {

    getState,
    subscribeState

} from "../state.js";

import {

    VIEWER_TYPES,
    setViewerLoading

} from "./viewer-state.js";

/* =========================
   MEDIA VIEWER
========================= */

const mediaViewer = {

    initialized: false,

    currentMedia: null,

    cleanupTasks: []

};

/* =========================
   DOM CACHE
========================= */

const dom = {

    viewer:
        document.getElementById(
            "portal-document-viewer"
        )

};

/* =========================
   VIEWER FRAME
========================= */

function createMediaFrame() {

    const frame =
        document.createElement("div");

    frame.className =
        "viewer-frame media-viewer-frame cosmic-panel glass-layer";

    frame.dataset.viewer =
        "media";

    return frame;

}

/* =========================
   EMPTY STATE
========================= */

function renderMediaIdleState() {

    if (!dom.viewer) {
        return;
    }

    dom.viewer.innerHTML = `
        <div class="viewer-frame viewer-empty-state cosmic-panel glass-layer">
            <div class="viewer-content">
                <div class="viewer-badge">
                    MEDIA STREAM
                </div>

                <h1 class="viewer-title">
                    No Active Media Signal
                </h1>

                <p class="viewer-description">
                    Image, audio, or video content will appear here.
                </p>
            </div>
        </div>
    `;

}

/* =========================
   LOADING VIEW
========================= */

function renderLoadingState() {

    const loader =
        document.createElement("div");

    loader.className =
        "viewer-loader";

    loader.innerHTML = `
        <div class="system-core-dot"></div>
        <span>Loading Media Stream...</span>
    `;

    mountMediaNode(loader);

}

/* =========================
   IMAGE VIEWER
========================= */

function createImageViewer(
    file
) {

    const frame =
        createMediaFrame();

    const image =
        document.createElement("img");

    image.className =
        "viewer-image";

    image.src =
        file.url;

    image.alt =
        file.name || "Media Image";

    image.loading =
        "lazy";

    frame.appendChild(image);

    return frame;

}

/* =========================
   VIDEO VIEWER
========================= */

function createVideoViewer(
    file
) {

    const frame =
        createMediaFrame();

    const video =
        document.createElement("video");

    video.className =
        "viewer-video";

    video.src =
        file.url;

    video.controls = true;

    video.autoplay =
        Boolean(file.autoplay);

    video.loop =
        Boolean(file.loop);

    video.playsInline =
        true;

    frame.appendChild(video);

    return frame;

}

/* =========================
   AUDIO VIEWER
========================= */

function createAudioViewer(
    file
) {

    const frame =
        createMediaFrame();

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "viewer-audio-shell";

    const title =
        document.createElement("h2");

    title.className =
        "viewer-audio-title";

    title.textContent =
        file.name || "Audio Stream";

    const audio =
        document.createElement("audio");

    audio.className =
        "viewer-audio";

    audio.src =
        file.url;

    audio.controls =
        true;

    audio.autoplay =
        Boolean(file.autoplay);

    audio.loop =
        Boolean(file.loop);

    wrapper.appendChild(title);

    wrapper.appendChild(audio);

    frame.appendChild(wrapper);

    return frame;

}

/* =========================
   UNSUPPORTED VIEW
========================= */

function createUnsupportedViewer(
    file
) {

    const frame =
        createMediaFrame();

    frame.innerHTML = `
        <div class="viewer-content">
            <div class="viewer-badge">
                UNKNOWN MEDIA TYPE
            </div>

            <h1 class="viewer-title">
                Unsupported Format
            </h1>

            <p class="viewer-description">
                Unable to decode media stream:
                ${file.name || "Unnamed File"}
            </p>
        </div>
    `;

    return frame;

}

/* =========================
   FACTORY
========================= */

function buildMediaViewer(
    file,
    type
) {

    switch (type) {

        case VIEWER_TYPES.IMAGE:

            return createImageViewer(
                file
            );

        case VIEWER_TYPES.VIDEO:

            return createVideoViewer(
                file
            );

        case VIEWER_TYPES.AUDIO:

            return createAudioViewer(
                file
            );

        default:

            return createUnsupportedViewer(
                file
            );

    }

}

/* =========================
   MOUNT NODE
========================= */

function mountMediaNode(
    node
) {

    if (!dom.viewer) {
        return;
    }

    dom.viewer.innerHTML = "";

    dom.viewer.appendChild(
        node
    );

}

/* =========================
   LOAD MEDIA
========================= */

async function loadMediaViewer(
    file,
    type
) {

    if (
        !file ||
        !type
    ) {

        renderMediaIdleState();

        return;

    }

    mediaViewer.currentMedia =
        file;

    setViewerLoading(true);

    renderLoadingState();

    await wait(140);

    const viewer =
        buildMediaViewer(
            file,
            type
        );

    mountMediaNode(
        viewer
    );

    setViewerLoading(false);

}

/* =========================
   WAIT
========================= */

function wait(duration) {

    return new Promise(
        function resolveDelay(resolve) {

            window.setTimeout(
                resolve,
                duration
            );

        }
    );

}

/* =========================
   VIEWER FILE CHANGE
========================= */

async function handleViewerUpdate(
    file
) {

    const type =
        getState(
            "viewer.currentType"
        );

    const isMediaType =
        type === VIEWER_TYPES.IMAGE ||
        type === VIEWER_TYPES.VIDEO ||
        type === VIEWER_TYPES.AUDIO;

    if (!isMediaType) {

        return;

    }

    await loadMediaViewer(
        file,
        type
    );

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const unsubscribe =
        subscribeState(
            "viewer.currentFile",
            handleViewerUpdate
        );

    mediaViewer.cleanupTasks.push(
        unsubscribe
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupMediaViewer() {

    const total =
        mediaViewer.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            mediaViewer.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[MEDIA VIEWER CLEANUP ERROR]",
                error
            );

        }

    }

    mediaViewer.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeMediaViewer() {

    if (
        mediaViewer.initialized
    ) {

        return;
    }

    renderMediaIdleState();

    initializeSubscriptions();

    mediaViewer.initialized =
        true;

    console.info(
        "%cMEDIA VIEWER ONLINE",
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

function destroyMediaViewer() {

    cleanupMediaViewer();

    mediaViewer.currentMedia =
        null;

    mediaViewer.initialized =
        false;

    console.info(
        "%cMEDIA VIEWER DESTROYED",
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

    mediaViewer,

    initializeMediaViewer,

    destroyMediaViewer,

    loadMediaViewer

}; 
