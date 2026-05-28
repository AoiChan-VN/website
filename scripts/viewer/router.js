// FILE: /aoichan-native/scripts/viewer/router.js

import {

    getState,
    subscribeState,
    setState

} from "../state.js";

import {

    VIEWER_TYPES,
    setViewerFile,
    clearViewer

} from "./viewer-state.js";

import {

    loadDocumentViewer

} from "./document-viewer.js";

import {

    loadMediaViewer

} from "./media-viewer.js";

/* =========================
   VIEWER ROUTER
========================= */

const viewerRouter = {

    initialized: false,

    currentRoute: null,

    registeredRoutes: new Map(),

    cleanupTasks: []

};

/* =========================
   ROUTE REGISTRY
========================= */

function registerDefaultRoutes() {

    viewerRouter.registeredRoutes.set(
        VIEWER_TYPES.DOCUMENT,
        loadDocumentViewer
    );

    viewerRouter.registeredRoutes.set(
        VIEWER_TYPES.IMAGE,
        loadMediaViewer
    );

    viewerRouter.registeredRoutes.set(
        VIEWER_TYPES.VIDEO,
        loadMediaViewer
    );

    viewerRouter.registeredRoutes.set(
        VIEWER_TYPES.AUDIO,
        loadMediaViewer
    );

}

/* =========================
   REGISTER ROUTE
========================= */

function registerViewerRoute(
    type,
    handler
) {

    if (
        typeof type !== "string" ||
        typeof handler !== "function"
    ) {

        return;

    }

    viewerRouter.registeredRoutes.set(
        type,
        handler
    );

}

/* =========================
   GET ROUTE
========================= */

function getViewerRoute(
    type
) {

    return (
        viewerRouter.registeredRoutes.get(
            type
        ) || null
    );

}

/* =========================
   ROUTE EXECUTION
========================= */

async function executeViewerRoute(
    file,
    type
) {

    const route =
        getViewerRoute(type);

    if (!route) {

        console.warn(
            "[VIEWER ROUTER] No Route:",
            type
        );

        return;

    }

    viewerRouter.currentRoute =
        type;

    try {

        await route(
            file,
            type
        );

    } catch (error) {

        console.error(
            "[VIEWER ROUTER ERROR]",
            error
        );

    }

}

/* =========================
   FILE STATE CHANGE
========================= */

async function handleViewerState(
    file
) {

    if (!file) {

        clearViewer();

        return;

    }

    const type =
        getState(
            "viewer.currentType"
        );

    if (!type) {

        console.warn(
            "[VIEWER ROUTER] Missing Type"
        );

        return;

    }

    await executeViewerRoute(
        file,
        type
    );

}

/* =========================
   URL HASH ROUTER
========================= */

function handleHashRoute() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim();

    if (!hash) {
        return;
    }

    const panel =
        hash.toLowerCase();

    setState(
        "system.activePanel",
        panel
    );

    const root =
        document.getElementById(
            "portal-root"
        );

    if (root) {

        root.dataset.panel =
            panel;

    }

}

/* =========================
   PANEL ROUTING
========================= */

function routePanel(
    panelName
) {

    if (
        typeof panelName !== "string"
    ) {

        return;

    }

    window.location.hash =
        panelName;

}

/* =========================
   ROUTE FILE
========================= */

async function routeViewerFile(
    file
) {

    if (!file) {

        clearViewer();

        return;

    }

    setViewerFile(
        file
    );

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const unsubscribeViewer =
        subscribeState(
            "viewer.currentFile",
            handleViewerState
        );

    viewerRouter.cleanupTasks.push(
        unsubscribeViewer
    );

}

/* =========================
   WINDOW EVENTS
========================= */

function initializeWindowRouting() {

    const hashHandler =
        function hashRouteHandler() {

            handleHashRoute();

        };

    window.addEventListener(
        "hashchange",
        hashHandler,
        {
            passive: true
        }
    );

    viewerRouter.cleanupTasks.push(
        function cleanupHash() {

            window.removeEventListener(
                "hashchange",
                hashHandler
            );

        }
    );

}

/* =========================
   ROUTE DEFAULT VIEW
========================= */

function initializeDefaultView() {

    const activePanel =
        getState(
            "system.activePanel"
        );

    if (
        !activePanel
    ) {

        setState(
            "system.activePanel",
            "home"
        );

    }

    handleHashRoute();

}

/* =========================
   VIEWER NAVIGATION API
========================= */

async function navigateViewer(
    payload
) {

    if (!payload) {

        clearViewer();

        return;
    }

    await routeViewerFile(
        payload
    );

}

/* =========================
   DESTROY ROUTES
========================= */

function cleanupViewerRouter() {

    const total =
        viewerRouter.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            viewerRouter.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[VIEWER ROUTER CLEANUP ERROR]",
                error
            );

        }

    }

    viewerRouter.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeViewerRouter() {

    if (
        viewerRouter.initialized
    ) {

        return;
    }

    registerDefaultRoutes();

    initializeSubscriptions();

    initializeWindowRouting();

    initializeDefaultView();

    viewerRouter.initialized =
        true;

    console.info(
        "%cVIEWER ROUTER ONLINE",
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

function destroyViewerRouter() {

    cleanupViewerRouter();

    viewerRouter.registeredRoutes.clear();

    viewerRouter.currentRoute =
        null;

    viewerRouter.initialized =
        false;

    console.info(
        "%cVIEWER ROUTER DESTROYED",
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

    viewerRouter,

    initializeViewerRouter,

    destroyViewerRouter,

    registerViewerRoute,

    navigateViewer,

    routePanel

}; 
