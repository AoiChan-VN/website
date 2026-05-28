// FILE: /aoichan-native/scripts/viewer/viewer-state.js

import {

    getState,
    setState,
    mergeState,
    subscribeState

} from "../state.js";

/* =========================
   VIEWER STATE RUNTIME
========================= */

const viewerStateRuntime = {

    initialized: false,

    cache: new Map(),

    history: [],

    maxHistory: 32,

    listeners: [],

    cleanupTasks: []

};

/* =========================
   VIEWER TYPES
========================= */

const VIEWER_TYPES = {

    DOCUMENT: "document",

    IMAGE: "image",

    VIDEO: "video",

    AUDIO: "audio",

    WEB: "web",

    UNKNOWN: "unknown"

};

/* =========================
   MIME DETECTION
========================= */

function detectViewerType(
    fileName = ""
) {

    const normalized =
        fileName.toLowerCase();

    if (
        normalized.endsWith(".pdf") ||
        normalized.endsWith(".txt") ||
        normalized.endsWith(".md") ||
        normalized.endsWith(".json")
    ) {

        return VIEWER_TYPES.DOCUMENT;

    }

    if (
        normalized.endsWith(".png") ||
        normalized.endsWith(".jpg") ||
        normalized.endsWith(".jpeg") ||
        normalized.endsWith(".webp") ||
        normalized.endsWith(".gif")
    ) {

        return VIEWER_TYPES.IMAGE;

    }

    if (
        normalized.endsWith(".mp4") ||
        normalized.endsWith(".webm") ||
        normalized.endsWith(".mov")
    ) {

        return VIEWER_TYPES.VIDEO;

    }

    if (
        normalized.endsWith(".mp3") ||
        normalized.endsWith(".wav") ||
        normalized.endsWith(".ogg")
    ) {

        return VIEWER_TYPES.AUDIO;

    }

    if (
        normalized.startsWith("http")
    ) {

        return VIEWER_TYPES.WEB;

    }

    return VIEWER_TYPES.UNKNOWN;

}

/* =========================
   CACHE SET
========================= */

function cacheViewerEntry(
    key,
    payload
) {

    if (!key) {
        return;
    }

    viewerStateRuntime.cache.set(
        key,
        {
            timestamp:
                Date.now(),

            ...payload
        }
    );

}

/* =========================
   CACHE GET
========================= */

function getCachedViewerEntry(
    key
) {

    return (
        viewerStateRuntime.cache.get(
            key
        ) || null
    );

}

/* =========================
   CLEAR CACHE
========================= */

function clearViewerCache() {

    viewerStateRuntime.cache.clear();

}

/* =========================
   HISTORY PUSH
========================= */

function pushViewerHistory(
    entry
) {

    viewerStateRuntime.history.unshift(
        {
            timestamp:
                Date.now(),

            ...entry
        }
    );

    if (
        viewerStateRuntime.history.length >
        viewerStateRuntime.maxHistory
    ) {

        viewerStateRuntime.history.length =
            viewerStateRuntime.maxHistory;

    }

}

/* =========================
   GET HISTORY
========================= */

function getViewerHistory() {

    return [
        ...viewerStateRuntime.history
    ];

}

/* =========================
   SET FILE
========================= */

function setViewerFile(
    file
) {

    if (!file) {

        clearViewer();

        return;

    }

    const fileType =
        detectViewerType(
            file.name || file.url || ""
        );

    mergeState(
        "viewer",
        {
            currentFile: file,

            currentType: fileType,

            loading: false
        }
    );

    setState(
        "system.activeViewer",
        fileType
    );

    pushViewerHistory({
        type: fileType,
        file
    });

}

/* =========================
   CLEAR VIEWER
========================= */

function clearViewer() {

    mergeState(
        "viewer",
        {
            currentFile: null,

            currentType: null,

            loading: false,

            scrollTop: 0
        }
    );

    setState(
        "system.activeViewer",
        "default"
    );

}

/* =========================
   LOADING
========================= */

function setViewerLoading(
    loadingState
) {

    setState(
        "viewer.loading",
        Boolean(loadingState)
    );

}

/* =========================
   SCROLL POSITION
========================= */

function setViewerScrollTop(
    value
) {

    setState(
        "viewer.scrollTop",
        Number(value) || 0
    );

}

/* =========================
   SUBSCRIBE VIEWER FILE
========================= */

function subscribeViewerFile(
    callback
) {

    return subscribeState(
        "viewer.currentFile",
        callback
    );

}

/* =========================
   SUBSCRIBE VIEWER TYPE
========================= */

function subscribeViewerType(
    callback
) {

    return subscribeState(
        "viewer.currentType",
        callback
    );

}

/* =========================
   RESTORE LAST VIEWER
========================= */

function restoreLastViewerSession() {

    const latest =
        viewerStateRuntime.history[0];

    if (!latest) {
        return;
    }

    setViewerFile(
        latest.file
    );

}

/* =========================
   SAVE SESSION
========================= */

function saveViewerSession() {

    const currentFile =
        getState(
            "viewer.currentFile"
        );

    if (!currentFile) {
        return;
    }

    try {

        localStorage.setItem(
            "portal:last-viewer-session",
            JSON.stringify(
                currentFile
            )
        );

    } catch (error) {

        console.warn(
            "[VIEWER SESSION SAVE FAILED]",
            error
        );

    }

}

/* =========================
   LOAD SESSION
========================= */

function loadViewerSession() {

    try {

        const raw =
            localStorage.getItem(
                "portal:last-viewer-session"
            );

        if (!raw) {
            return;
        }

        const parsed =
            JSON.parse(raw);

        if (!parsed) {
            return;
        }

        setViewerFile(
            parsed
        );

    } catch (error) {

        console.warn(
            "[VIEWER SESSION LOAD FAILED]",
            error
        );

    }

}

/* =========================
   AUTO SAVE
========================= */

function initializeAutoSave() {

    const unsubscribe =
        subscribeState(
            "viewer.currentFile",
            saveViewerSession
        );

    viewerStateRuntime.cleanupTasks.push(
        unsubscribe
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupViewerState() {

    const total =
        viewerStateRuntime.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            viewerStateRuntime.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[VIEWER STATE CLEANUP ERROR]",
                error
            );

        }

    }

    viewerStateRuntime.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeViewerState() {

    if (
        viewerStateRuntime.initialized
    ) {

        return;
    }

    initializeAutoSave();

    loadViewerSession();

    viewerStateRuntime.initialized =
        true;

    console.info(
        "%cVIEWER STATE ONLINE",
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

function destroyViewerState() {

    cleanupViewerState();

    clearViewerCache();

    viewerStateRuntime.history.length = 0;

    viewerStateRuntime.initialized =
        false;

    console.info(
        "%cVIEWER STATE DESTROYED",
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

    VIEWER_TYPES,

    viewerStateRuntime,

    initializeViewerState,

    destroyViewerState,

    detectViewerType,

    setViewerFile,

    clearViewer,

    setViewerLoading,

    setViewerScrollTop,

    subscribeViewerFile,

    subscribeViewerType,

    getViewerHistory,

    restoreLastViewerSession,

    cacheViewerEntry,

    getCachedViewerEntry,

    clearViewerCache

}; 
