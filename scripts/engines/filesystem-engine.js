// FILE: /aoichan-native/scripts/engines/filesystem-engine.js

import {

    getState,
    setState,
    subscribeState

} from "../state.js";

/* =========================
   FILESYSTEM ENGINE
========================= */

const filesystemEngine = {

    initialized: false,

    directories: new Map(),

    files: new Map(),

    mountedVolumes: [],

    recentFiles: [],

    cleanupTasks: []

};

/* =========================
   MOCK FILESYSTEM
========================= */

const rootStructure = {

    "/": {

        type: "directory",

        children: [

            "/documents",
            "/media",
            "/projects",
            "/system"

        ]

    },

    "/documents": {

        type: "directory",

        children: [

            "/documents/atlas.txt",
            "/documents/echo-log.md",
            "/documents/void-map.json"

        ]

    },

    "/media": {

        type: "directory",

        children: [

            "/media/orbit.png",
            "/media/horizon.mp4",
            "/media/stasis.wav"

        ]

    },

    "/projects": {

        type: "directory",

        children: [

            "/projects/native-space-portal",
            "/projects/quantum-shell"

        ]

    },

    "/system": {

        type: "directory",

        children: [

            "/system/kernel.sys",
            "/system/runtime.log"

        ]

    },

    "/documents/atlas.txt": {

        type: "file",

        extension: "txt",

        size: "12 KB",

        modified:
            "2088-03-17",

        content:
            "Atlas archive loaded."

    },

    "/documents/echo-log.md": {

        type: "file",

        extension: "md",

        size: "28 KB",

        modified:
            "2088-05-02",

        content:
            "# Echo Log\nSignal integrity stable."

    },

    "/documents/void-map.json": {

        type: "file",

        extension: "json",

        size: "7 KB",

        modified:
            "2088-05-19",

        content:
            "{ \"sector\": \"A-17\" }"

    },

    "/media/orbit.png": {

        type: "file",

        extension: "png",

        size: "2.3 MB",

        modified:
            "2088-04-14"

    },

    "/media/horizon.mp4": {

        type: "file",

        extension: "mp4",

        size: "112 MB",

        modified:
            "2088-01-21"

    },

    "/media/stasis.wav": {

        type: "file",

        extension: "wav",

        size: "24 MB",

        modified:
            "2088-02-03"

    },

    "/projects/native-space-portal": {

        type: "directory",

        children: [

            "/projects/native-space-portal/main.js",
            "/projects/native-space-portal/ui.css"

        ]

    },

    "/projects/native-space-portal/main.js": {

        type: "file",

        extension: "js",

        size: "88 KB",

        modified:
            "2088-05-28",

        content:
            "console.log('Portal Initialized');"

    },

    "/projects/native-space-portal/ui.css": {

        type: "file",

        extension: "css",

        size: "42 KB",

        modified:
            "2088-05-29",

        content:
            "body { background: black; }"

    },

    "/projects/quantum-shell": {

        type: "directory",

        children: []

    },

    "/system/kernel.sys": {

        type: "file",

        extension: "sys",

        size: "640 KB",

        modified:
            "2088-01-01"

    },

    "/system/runtime.log": {

        type: "file",

        extension: "log",

        size: "14 KB",

        modified:
            "2088-05-29"

    }

};

/* =========================
   LOAD STRUCTURE
========================= */

function loadFilesystemStructure() {

    const entries =
        Object.entries(
            rootStructure
        );

    const total =
        entries.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const [
            path,
            node
        ] = entries[index];

        if (
            node.type ===
            "directory"
        ) {

            filesystemEngine.directories.set(
                path,
                node
            );

        }

        if (
            node.type ===
            "file"
        ) {

            filesystemEngine.files.set(
                path,
                node
            );

        }

    }

}

/* =========================
   PATH EXISTS
========================= */

function pathExists(
    path
) {

    return (
        filesystemEngine.directories.has(
            path
        ) ||
        filesystemEngine.files.has(
            path
        )
    );

}

/* =========================
   GET NODE
========================= */

function getNode(
    path
) {

    if (
        filesystemEngine.directories.has(
            path
        )
    ) {

        return filesystemEngine.directories.get(
            path
        );

    }

    if (
        filesystemEngine.files.has(
            path
        )
    ) {

        return filesystemEngine.files.get(
            path
        );

    }

    return null;

}

/* =========================
   READ DIRECTORY
========================= */

function readDirectory(
    path = "/"
) {

    const directory =
        filesystemEngine.directories.get(
            path
        );

    if (
        !directory
    ) {

        return [];
    }

    return directory.children.map(
        function mapChildren(
            childPath
        ) {

            return {

                path: childPath,

                node:
                    getNode(
                        childPath
                    )

            };

        }
    );

}

/* =========================
   READ FILE
========================= */

function readFile(
    path
) {

    const file =
        filesystemEngine.files.get(
            path
        );

    if (!file) {

        return null;

    }

    addRecentFile(
        path
    );

    setState(
        "filesystem.activeFile",
        path
    );

    return file;

}

/* =========================
   WRITE FILE
========================= */

function writeFile(
    path,
    content
) {

    const file =
        filesystemEngine.files.get(
            path
        );

    if (!file) {

        return false;

    }

    file.content =
        content;

    file.modified =
        new Date()
            .toISOString()
            .slice(0, 10);

    setState(
        "filesystem.lastModified",
        path
    );

    return true;

}

/* =========================
   CREATE FILE
========================= */

function createFile(
    path,
    extension = "txt"
) {

    if (
        pathExists(path)
    ) {

        return false;

    }

    filesystemEngine.files.set(
        path,
        {

            type: "file",

            extension,

            size: "0 KB",

            modified:
                new Date()
                    .toISOString()
                    .slice(0, 10),

            content: ""

        }
    );

    return true;

}

/* =========================
   DELETE FILE
========================= */

function deleteFile(
    path
) {

    if (
        !filesystemEngine.files.has(
            path
        )
    ) {

        return false;

    }

    filesystemEngine.files.delete(
        path
    );

    filesystemEngine.recentFiles =
        filesystemEngine.recentFiles.filter(
            function filterRecent(
                filePath
            ) {

                return (
                    filePath !== path
                );

            }
        );

    return true;

}

/* =========================
   RECENT FILES
========================= */

function addRecentFile(
    path
) {

    filesystemEngine.recentFiles =
        filesystemEngine.recentFiles.filter(
            function removeDuplicate(
                item
            ) {

                return item !== path;

            }
        );

    filesystemEngine.recentFiles.unshift(
        path
    );

    filesystemEngine.recentFiles =
        filesystemEngine.recentFiles.slice(
            0,
            12
        );

    setState(
        "filesystem.recentFiles",
        filesystemEngine.recentFiles
    );

}

/* =========================
   SEARCH FILES
========================= */

function searchFilesystem(
    query
) {

    const lower =
        query.toLowerCase();

    const results = [];

    filesystemEngine.files.forEach(
        function scanFile(
            file,
            path
        ) {

            if (
                path.toLowerCase().includes(
                    lower
                )
            ) {

                results.push({

                    path,
                    file

                });

            }

        }
    );

    return results;

}

/* =========================
   MOUNT VOLUME
========================= */

function mountVolume(
    name
) {

    if (
        filesystemEngine.mountedVolumes.includes(
            name
        )
    ) {

        return;
    }

    filesystemEngine.mountedVolumes.push(
        name
    );

    setState(
        "filesystem.volumes",
        filesystemEngine.mountedVolumes
    );

}

/* =========================
   DIRECTORY STATE
========================= */

function syncDirectoryState(
    path
) {

    const entries =
        readDirectory(
            path
        );

    setState(
        "filesystem.currentDirectory",
        path
    );

    setState(
        "filesystem.directoryEntries",
        entries
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
        "explorer"
    ) {

        return;
    }

    syncDirectoryState(
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
            handlePanelState
        );

    filesystemEngine.cleanupTasks.push(
        panelSubscription
    );

}

/* =========================
   CLEANUP
========================= */

function cleanupFilesystemEngine() {

    const total =
        filesystemEngine.cleanupTasks.length;

    for (
        let index = 0;
        index < total;
        index += 1
    ) {

        const cleanup =
            filesystemEngine.cleanupTasks[index];

        try {

            cleanup();

        } catch (error) {

            console.error(
                "[FILESYSTEM CLEANUP ERROR]",
                error
            );

        }

    }

    filesystemEngine.cleanupTasks.length = 0;

}

/* =========================
   INITIALIZE
========================= */

function initializeFilesystemEngine() {

    if (
        filesystemEngine.initialized
    ) {

        return;
    }

    loadFilesystemStructure();

    initializeSubscriptions();

    mountVolume(
        "ROOT"
    );

    mountVolume(
        "ARCHIVE"
    );

    mountVolume(
        "SYNTH-NODE"
    );

    syncDirectoryState(
        "/"
    );

    filesystemEngine.initialized =
        true;

    console.info(
        "%cFILESYSTEM ENGINE ONLINE",
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

function destroyFilesystemEngine() {

    cleanupFilesystemEngine();

    filesystemEngine.directories.clear();

    filesystemEngine.files.clear();

    filesystemEngine.recentFiles.length = 0;

    filesystemEngine.mountedVolumes.length = 0;

    filesystemEngine.initialized =
        false;

    console.info(
        "%cFILESYSTEM ENGINE DESTROYED",
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

    filesystemEngine,

    initializeFilesystemEngine,

    destroyFilesystemEngine,

    pathExists,

    getNode,

    readDirectory,

    readFile,

    writeFile,

    createFile,

    deleteFile,

    searchFilesystem,

    mountVolume

}; 
