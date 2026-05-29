// FILE: /aoichan-native/scripts/engines/workspace-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

import {

    createTab,
    openTab,
    updateTab

} from "./tabs-engine.js";

import {

    fadeTransition,
    blurRevealTransition

} from "./transition-engine.js";

/* =========================
   WORKSPACE ENGINE
========================= */

const workspaceEngine = {

    initialized: false,

    layout: "default",

    focusedPane: "viewer",

    workspaces: new Map(),

    autosaveTimer: null,

    cleanupTasks: []

};

/* =========================
   DOM CACHE
========================= */

const dom = {

    workspace:
        document.getElementById(
            "portal-workspace"
        ),

    viewer:
        document.getElementById(
            "portal-document-viewer"
        ),

    sidebar:
        document.getElementById(
            "portal-explorer-sidebar"
        ),

    tabs:
        document.getElementById(
            "portal-tabs"
        )

};

/* =========================
   DEFAULT WORKSPACE
========================= */

const defaultWorkspace = {

    id: "workspace-default",

    name: "Primary Workspace",

    layout: "default",

    tabs: [],

    lastOpened:
        Date.now()

};

/* =========================
   SAVE WORKSPACE
========================= */

function saveWorkspace(
    workspaceId,
    data = {}
) {

    const existing =
        workspaceEngine.workspaces.get(
            workspaceId
        ) || {};

    const payload = {

        ...existing,

        ...data,

        updatedAt:
            Date.now()

    };

    workspaceEngine.workspaces.set(
        workspaceId,
        payload
    );

    persistWorkspaceStorage();

    setState(
        "workspace.current",
        payload
    );

}

/* =========================
   LOAD WORKSPACE
========================= */

function loadWorkspace(
    workspaceId
) {

    const workspace =
        workspaceEngine.workspaces.get(
            workspaceId
        );

    if (!workspace) {

        return null;

    }

    workspaceEngine.layout =
        workspace.layout ||
        "default";

    applyWorkspaceLayout(
        workspace.layout
    );

    setState(
        "workspace.loaded",
        workspaceId
    );

    return workspace;

}

/* =========================
   STORAGE SAVE
========================= */

function persistWorkspaceStorage() {

    try {

        const serialized =
            JSON.stringify(
                Array.from(
                    workspaceEngine.workspaces.entries()
                )
            );

        window.localStorage.setItem(
            "native-space-workspaces",
            serialized
        );

    } catch (error) {

        console.error(
            "[WORKSPACE STORAGE SAVE ERROR]",
            error
        );

    }

}

/* =========================
   STORAGE LOAD
========================= */

function restoreWorkspaceStorage() {

    try {

        const raw =
            window.localStorage.getItem(
                "native-space-workspaces"
            );

        if (!raw) {

            saveWorkspace(
                defaultWorkspace.id,
                defaultWorkspace
            );

            return;

        }

        const parsed =
            JSON.parse(raw);

        workspaceEngine.workspaces =
            new Map(parsed);

    } catch (error) {

        console.error(
            "[WORKSPACE STORAGE LOAD ERROR]",
            error
        );

    }

}

/* =========================
   APPLY LAYOUT
========================= */

function applyWorkspaceLayout(
    layout = "default"
) {

    workspaceEngine.layout =
        layout;

    if (
        !dom.workspace
    ) {

        return;
    }

    dom.workspace.dataset.layout =
        layout;

    switch (layout) {

        case "focus":

            dom.sidebar?.setAttribute(
                "data-hidden",
                "true"
            );

            break;

        case "expanded":

            dom.sidebar?.removeAttribute(
                "data-hidden"
            );

            dom.viewer?.setAttribute(
                "data-expanded",
                "true"
            );

            break;

        default:

            dom.sidebar?.removeAttribute(
                "data-hidden"
            );

            dom.viewer?.removeAttribute(
                "data-expanded"
            );

            break;

    }

    blurRevealTransition(
        dom.workspace,
        {
            duration: 720,
            blur: 16
        }
    );

    setState(
        "workspace.layout",
        layout
    );

}

/* =========================
   FOCUS PANE
========================= */

function focusPane(
    pane
) {

    workspaceEngine.focusedPane =
        pane;

    setState(
        "workspace.focusedPane",
        pane
    );

    const panes = [

        dom.viewer,
        dom.sidebar,
        dom.tabs

    ];

    const total =
        panes.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        panes[index]?.removeAttribute(
            "data-focused"
        );

    }

    switch (pane) {

        case "viewer":

            dom.viewer?.setAttribute(
                "data-focused",
                "true"
            );

            break;

        case "sidebar":

            dom.sidebar?.setAttribute(
                "data-focused",
                "true"
            );

            break;

        case "tabs":

            dom.tabs?.setAttribute(
                "data-focused",
                "true"
            );

            break;

    }

}

/* =========================
   SPLIT VIEW
========================= */

function enableSplitView() {

    if (
        !dom.workspace
    ) {

        return;
    }

    dom.workspace.dataset.split =
        "true";

    fadeTransition(
        dom.workspace,
        {
            duration: 520
        }
    );

    setState(
        "workspace.splitView",
        true
    );

}

/* =========================
   DISABLE SPLIT VIEW
========================= */

function disableSplitView() {

    if (
        !dom.workspace
    ) {

        return;
    }

    dom.workspace.dataset.split =
        "false";

    setState(
        "workspace.splitView",
        false
    );

}

/* =========================
   AUTOSAVE
========================= */

function initializeAutosaveLoop() {

    workspaceEngine.autosaveTimer =
        window.setInterval(
            function autosaveWorkspace() {

                const snapshot = {

                    layout:
                        workspaceEngine.layout,

                    focusedPane:
                        workspaceEngine.focusedPane,

                    timestamp:
                        Date.now()

                };

                saveWorkspace(
                    "workspace-autosave",
                    snapshot
                );

            },
            12000
        );

}

/* =========================
   KEYBOARD SHORTCUTS
========================= */

function initializeKeyboardShortcuts() {

    const keyHandler =
        function handleWorkspaceKeys(
            event
        ) {

            if (
                !event.ctrlKey
            ) {

                return;
            }

            switch (
                event.key.toLowerCase()
            ) {

                case "1":

                    applyWorkspaceLayout(
                        "default"
                    );

                    break;

                case "2":

                    applyWorkspaceLayout(
                        "focus"
                    );

                    break;

                case "3":

                    applyWorkspaceLayout(
                        "expanded"
                    );

                    break;

                case "b":

                    enableSplitView();

                    break;

                case "m":

                    disableSplitView();

                    break;

            }

        };

    window.addEventListener(
        "keydown",
        keyHandler
    );

    workspaceEngine.cleanupTasks.push(
        function cleanupKeys() {

            window.removeEventListener(
                "keydown",
                keyHandler
            );

        }
    );

}

/* =========================
   ACTIVE PANEL
========================= */

function handlePanelState(
    panel
) {

    if (
        panel !==
        "workspace"
    ) {

        return;
    }

    applyWorkspaceLayout(
        workspaceEngine.layout
    );

}

/* =========================
   SUBSCRIPTIONS
========================= */

function initializeSubscriptions() {

    const panelSubscription =
        subscribeState(
            "system.activePanel",
            handlePanelState
        );

    workspaceEngine.cleanupTasks.push(
        panelSubscription
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupWorkspaceEngine() {

    const total =
        workspaceEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            workspaceEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[WORKSPACE CLEANUP ERROR]",
                error
            );

        }

    }

    workspaceEngine.cleanupTasks.length = 0;

    if (
        workspaceEngine.autosaveTimer
    ) {

        clearInterval(
            workspaceEngine.autosaveTimer
        );

    }

}

/* =========================
   INITIALIZE
========================= */

function initializeWorkspaceEngine() {

    if (
        workspaceEngine.initialized
    ) {

        return;
    }

    restoreWorkspaceStorage();

    initializeAutosaveLoop();

    initializeKeyboardShortcuts();

    initializeSubscriptions();

    applyWorkspaceLayout(
        "default"
    );

    focusPane(
        "viewer"
    );

    workspaceEngine.initialized =
        true;

    console.info(
        "%cWORKSPACE ENGINE ONLINE",
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

function destroyWorkspaceEngine() {

    cleanupWorkspaceEngine();

    workspaceEngine.workspaces.clear();

    workspaceEngine.initialized =
        false;

    console.info(
        "%cWORKSPACE ENGINE DESTROYED",
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

    workspaceEngine,

    initializeWorkspaceEngine,

    destroyWorkspaceEngine,

    saveWorkspace,

    loadWorkspace,

    applyWorkspaceLayout,

    focusPane,

    enableSplitView,

    disableSplitView

}; 
