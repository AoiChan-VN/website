// FILE: /aoichan-native/scripts/viewer/document-viewer.js

import {

    getState,
    subscribeState

} from "../state.js";

import {

    VIEWER_TYPES,
    setViewerLoading,
    setViewerScrollTop

} from "./viewer-state.js";

/* =========================
   DOCUMENT VIEWER
========================= */

const documentViewer = {

    initialized: false,

    activeController: null,

    currentFile: null,

    cleanupTasks: []

};

/* =========================
   DOM REFERENCES
========================= */

const dom = {

    viewer:
        document.getElementById(
            "portal-document-viewer"
        )

};

/* =========================
   CREATE FRAME
========================= */

function createViewerFrame() {

    const frame =
        document.createElement("div");

    frame.className =
        "viewer-frame cosmic-panel glass-layer";

    frame.dataset.viewer =
        "document";

    return frame;

}

/* =========================
   CREATE LOADER
========================= */

function createLoadingIndicator() {

    const loader =
        document.createElement("div");

    loader.className =
        "viewer-loader";

    loader.innerHTML = `
        <div class="system-core-dot"></div>
        <span>Loading Document...</span>
    `;

    return loader;

}

/* =========================
   EMPTY VIEW
========================= */

function renderEmptyViewer() {

    if (!dom.viewer) {
        return;
    }

    dom.viewer.innerHTML = `
        <div class="viewer-frame viewer-empty-state cosmic-panel glass-layer">
            <div class="viewer-content">
                <div class="viewer-badge">
                    NATIVE SPACE PORTAL
                </div>

                <h1 class="viewer-title">
                    Awaiting Document Stream
                </h1>

                <p class="viewer-description">
                    No active document detected in viewer memory.
                </p>
            </div>
        </div>
    `;

}

/* =========================
   PDF VIEW
========================= */

function createPDFViewer(
    file
) {

    const frame =
        createViewerFrame();

    const embed =
        document.createElement("embed");

    embed.src =
        file.url;

    embed.type =
        "application/pdf";

    embed.loading =
        "lazy";

    frame.appendChild(embed);

    return frame;

}

/* =========================
   TEXT VIEW
========================= */

function createTextViewer(
    file
) {

    const frame =
        createViewerFrame();

    const content =
        document.createElement("pre");

    content.className =
        "viewer-document-text";

    content.textContent =
        file.content ||
        "No text content available.";

    frame.appendChild(content);

    return frame;

}

/* =========================
   JSON VIEW
========================= */

function createJSONViewer(
    file
) {

    const frame =
        createViewerFrame();

    const content =
        document.createElement("pre");

    content.className =
        "viewer-json-text";

    try {

        const parsed =
            typeof file.content ===
            "string"
                ? JSON.parse(
                    file.content
                )
                : file.content;

        content.textContent =
            JSON.stringify(
                parsed,
                null,
                4
            );

    } catch (error) {

        content.textContent =
            "Invalid JSON structure.";

    }

    frame.appendChild(content);

    return frame;

}

/* =========================
   MARKDOWN VIEW
========================= */

function createMarkdownViewer(
    file
) {

    const frame =
        createViewerFrame();

    const article =
        document.createElement("article");

    article.className =
        "viewer-markdown";

    const markdown =
        file.content || "";

    article.innerHTML =
        markdown
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/gim, "<em>$1</em>")
            .replace(/\n/gim, "<br>");

    frame.appendChild(article);

    return frame;

}

/* =========================
   DOCUMENT FACTORY
========================= */

function buildDocumentViewer(
    file
) {

    const name =
        (
            file.name || ""
        ).toLowerCase();

    if (
        name.endsWith(".pdf")
    ) {

        return createPDFViewer(
            file
        );

    }

    if (
        name.endsWith(".json")
    ) {

        return createJSONViewer(
            file
        );

    }

    if (
        name.endsWith(".md")
    ) {

        return createMarkdownViewer(
            file
        );

    }

    return createTextViewer(
        file
    );

}

/* =========================
   MOUNT VIEW
========================= */

function mountViewerContent(
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
   LOAD VIEWER
========================= */

async function loadDocumentViewer(
    file
) {

    if (!file) {

        renderEmptyViewer();

        return;

    }

    documentViewer.currentFile =
        file;

    setViewerLoading(true);

    const loader =
        createLoadingIndicator();

    mountViewerContent(loader);

    await wait(120);

    const viewer =
        buildDocumentViewer(
            file
        );

    mountViewerContent(
        viewer
    );

    restoreScrollPosition();

    setViewerLoading(false);

}

/* =========================
   WAIT
========================= */

function wait(duration) {

    return new Promise(
        function resolvePromise(resolve) {

            window.setTimeout(
                resolve,
                duration
            );

        }
    );

}

/* =========================
   VIEWER CHANGE
========================= */

async function handleViewerFile(
    file
) {

    const type =
        getState(
            "viewer.currentType"
        );

    if (
        type !== VIEWER_TYPES.DOCUMENT
    ) {

        return;

    }

    await loadDocumentViewer(
        file
    );

}

/* =========================
   SCROLL TRACKER
========================= */

function handleViewerScroll(
    event
) {

    const target =
        event.target;

    setViewerScrollTop(
        target.scrollTop
    );

}

/* =========================
   RESTORE SCROLL
========================= */

function restoreScrollPosition() {

    const scrollTop =
        getState(
            "viewer.scrollTop"
        );

    const frame =
        dom.viewer?.querySelector(
            ".viewer-frame"
        );

    if (!frame) {
        return;
    }

    frame.scrollTop =
        scrollTop;

}

/* =========================
   SCROLL LISTENER
========================= */

function initializeScrollTracking() {

    if (!dom.viewer) {
        return;
    }

    const handler =
        function handleScroll(event) {

            handleViewerScroll(
                event
            );

        };

    dom.viewer.addEventListener(
        "scroll",
        handler,
        {
            passive: true
        }
    );

    documentViewer.cleanupTasks.push(
        function cleanupScroll() {

            dom.viewer.removeEventListener(
                "scroll",
                handler
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
            "viewer.currentFile",
            handleViewerFile
        );

    documentViewer.cleanupTasks.push(
        unsubscribe
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupDocumentViewer() {

    const total =
        documentViewer.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            documentViewer.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[DOCUMENT VIEWER CLEANUP ERROR]",
                error
            );

        }

    }

    documentViewer.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeDocumentViewer() {

    if (
        documentViewer.initialized
    ) {

        return;
    }

    renderEmptyViewer();

    initializeScrollTracking();

    initializeSubscriptions();

    documentViewer.initialized =
        true;

    console.info(
        "%cDOCUMENT VIEWER ONLINE",
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

function destroyDocumentViewer() {

    cleanupDocumentViewer();

    documentViewer.currentFile =
        null;

    documentViewer.initialized =
        false;

    console.info(
        "%cDOCUMENT VIEWER DESTROYED",
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

    documentViewer,

    initializeDocumentViewer,

    destroyDocumentViewer,

    loadDocumentViewer

}; 
