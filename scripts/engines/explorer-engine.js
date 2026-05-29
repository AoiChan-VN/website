// FILE: /aoichan-native/scripts/engines/explorer-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

import {

    readDirectory,
    readFile,
    searchFilesystem

} from "./filesystem-engine.js";

import {

    fadeTransition,
    slideTransition

} from "./transition-engine.js";

/* =========================
   EXPLORER ENGINE
========================= */

const explorerEngine = {

    initialized: false,

    selectedPath: null,

    currentDirectory: "/",

    searchResults: [],

    cleanupTasks: []

};

/* =========================
   DOM CACHE
========================= */

const dom = {

    explorer:
        document.getElementById(
            "portal-explorer"
        ),

    sidebar:
        document.getElementById(
            "portal-explorer-sidebar"
        ),

    viewer:
        document.getElementById(
            "portal-document-viewer"
        ),

    breadcrumb:
        document.getElementById(
            "portal-breadcrumbs"
        ),

    searchInput:
        document.getElementById(
            "portal-search-input"
        )

};

/* =========================
   ICON MAP
========================= */

const iconMap = {

    directory: "◈",

    txt: "TXT",

    md: "MD",

    json: "JSON",

    png: "IMG",

    mp4: "VID",

    wav: "AUD",

    js: "JS",

    css: "CSS",

    sys: "SYS",

    log: "LOG"

};

/* =========================
   CLEAR ELEMENT
========================= */

function clearElement(
    element
) {

    if (!element) {
        return;
    }

    element.innerHTML = "";

}

/* =========================
   GET ICON
========================= */

function getNodeIcon(
    node
) {

    if (!node) {

        return "???";

    }

    if (
        node.type ===
        "directory"
    ) {

        return iconMap.directory;

    }

    return (
        iconMap[
            node.extension
        ] || "FILE"
    );

}

/* =========================
   CREATE ENTRY
========================= */

function createEntryElement(
    path,
    node
) {

    const button =
        document.createElement(
            "button"
        );

    button.className =
        "explorer-entry";

    button.dataset.path =
        path;

    const icon =
        getNodeIcon(
            node
        );

    const name =
        path.split("/").pop();

    button.innerHTML =
        `
        <span class="entry-icon">
            ${icon}
        </span>

        <span class="entry-name">
            ${name}
        </span>
        `;

    button.addEventListener(
        "click",
        function handleExplorerClick() {

            openNode(
                path,
                node
            );

        }
    );

    return button;

}

/* =========================
   RENDER DIRECTORY
========================= */

function renderDirectory(
    path
) {

    if (
        !dom.sidebar
    ) {

        return;
    }

    clearElement(
        dom.sidebar
    );

    const entries =
        readDirectory(
            path
        );

    const total =
        entries.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const entry =
            entries[index];

        const element =
            createEntryElement(
                entry.path,
                entry.node
            );

        dom.sidebar.appendChild(
            element
        );

    }

    explorerEngine.currentDirectory =
        path;

    setState(
        "explorer.currentDirectory",
        path
    );

    renderBreadcrumbs(
        path
    );

    slideTransition(
        dom.sidebar,
        "left",
        {
            duration: 520
        }
    );

}

/* =========================
   RENDER FILE
========================= */

function renderFileViewer(
    path,
    file
) {

    if (
        !dom.viewer
    ) {

        return;
    }

    const extension =
        file.extension ||
        "file";

    dom.viewer.innerHTML =
        `
        <div class="viewer-meta">

            <div class="viewer-title">
                ${path}
            </div>

            <div class="viewer-tags">

                <span>${extension.toUpperCase()}</span>
                <span>${file.size || "UNKNOWN"}</span>
                <span>${file.modified || "N/A"}</span>

            </div>

        </div>

        <pre class="viewer-content">
${file.content || "[ Binary Data ]"}
        </pre>
        `;

    fadeTransition(
        dom.viewer,
        {
            duration: 620
        }
    );

}

/* =========================
   OPEN NODE
========================= */

function openNode(
    path,
    node
) {

    explorerEngine.selectedPath =
        path;

    setState(
        "explorer.selectedPath",
        path
    );

    if (
        node.type ===
        "directory"
    ) {

        renderDirectory(
            path
        );

        return;

    }

    const file =
        readFile(
            path
        );

    renderFileViewer(
        path,
        file
    );

}

/* =========================
   BREADCRUMBS
========================= */

function renderBreadcrumbs(
    path
) {

    if (
        !dom.breadcrumb
    ) {

        return;
    }

    clearElement(
        dom.breadcrumb
    );

    const segments =
        path
            .split("/")
            .filter(Boolean);

    let current = "";

    const root =
        document.createElement(
            "button"
        );

    root.className =
        "breadcrumb-node";

    root.textContent =
        "ROOT";

    root.addEventListener(
        "click",
        function goRoot() {

            renderDirectory(
                "/"
            );

        }
    );

    dom.breadcrumb.appendChild(
        root
    );

    const total =
        segments.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        current +=
            `/${segments[index]}`;

        const crumb =
            document.createElement(
                "button"
            );

        crumb.className =
            "breadcrumb-node";

        crumb.textContent =
            segments[index];

        const pathRef =
            current;

        crumb.addEventListener(
            "click",
            function openBreadcrumb() {

                renderDirectory(
                    pathRef
                );

            }
        );

        dom.breadcrumb.appendChild(
            crumb
        );

    }

}

/* =========================
   SEARCH
========================= */

function performSearch(
    query
) {

    if (
        !query ||
        !query.trim()
    ) {

        renderDirectory(
            explorerEngine.currentDirectory
        );

        return;
    }

    const results =
        searchFilesystem(
            query
        );

    explorerEngine.searchResults =
        results;

    clearElement(
        dom.sidebar
    );

    const total =
        results.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const result =
            results[index];

        const element =
            createEntryElement(
                result.path,
                result.file
            );

        dom.sidebar.appendChild(
            element
        );

    }

    setState(
        "explorer.searchResults",
        results
    );

}

/* =========================
   SEARCH EVENTS
========================= */

function initializeSearchEvents() {

    if (
        !dom.searchInput
    ) {

        return;
    }

    const inputHandler =
        function handleInput(
            event
        ) {

            performSearch(
                event.target.value
            );

        };

    dom.searchInput.addEventListener(
        "input",
        inputHandler
    );

    explorerEngine.cleanupTasks.push(
        function cleanupSearch() {

            dom.searchInput.removeEventListener(
                "input",
                inputHandler
            );

        }
    );

}

/* =========================
   PANEL STATE
========================= */

function handlePanelChange(
    panel
) {

    if (
        panel !==
        "explorer"
    ) {

        return;
    }

    renderDirectory(
        "/"
    );

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const panelSubscription =
        subscribeState(
            "system.activePanel",
            handlePanelChange
        );

    explorerEngine.cleanupTasks.push(
        panelSubscription
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupExplorerEngine() {

    const total =
        explorerEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            explorerEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[EXPLORER CLEANUP ERROR]",
                error
            );

        }

    }

    explorerEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeExplorerEngine() {

    if (
        explorerEngine.initialized
    ) {

        return;
    }

    initializeSubscriptions();

    initializeSearchEvents();

    renderDirectory(
        "/"
    );

    explorerEngine.initialized =
        true;

    console.info(
        "%cEXPLORER ENGINE ONLINE",
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

function destroyExplorerEngine() {

    cleanupExplorerEngine();

    explorerEngine.searchResults.length = 0;

    explorerEngine.selectedPath =
        null;

    explorerEngine.initialized =
        false;

    console.info(
        "%cEXPLORER ENGINE DESTROYED",
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

    explorerEngine,

    initializeExplorerEngine,

    destroyExplorerEngine,

    renderDirectory,

    openNode,

    performSearch

}; 
