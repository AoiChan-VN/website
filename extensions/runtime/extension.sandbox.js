/**
 * AOI EXTENSION SANDBOX
 * isolated extension execution layer
 */

(function () {
    'use strict';

    const SANDBOXES = new Map();

    function create(extensionId) {
        if (SANDBOXES.has(extensionId)) {
            return SANDBOXES.get(extensionId);
        }

        const sandbox = {
            id: extensionId,

            createdAt: Date.now(),

            api: {
                storage: {
                    get(key) {
                        return window.AOI_EXTENSION_STORAGE.get(
                            extensionId,
                            key
                        );
                    },

                    set(key, value) {
                        return window.AOI_EXTENSION_STORAGE.set(
                            extensionId,
                            key,
                            value
                        );
                    },

                    remove(key) {
                        return window.AOI_EXTENSION_STORAGE.remove(
                            extensionId,
                            key
                        );
                    }
                },

                events: {
                    emit(eventName, payload = {}) {
                        window.AOI_EXTENSION_EVENTS.emit(
                            eventName,
                            {
                                extensionId,
                                ...payload
                            }
                        );
                    },

                    on(eventName, callback) {
                        window.AOI_EXTENSION_EVENTS.on(
                            eventName,
                            callback
                        );
                    },

                    off(eventName, callback) {
                        window.AOI_EXTENSION_EVENTS.off(
                            eventName,
                            callback
                        );
                    }
                },

                dom: {
                    query(selector) {
                        return document.querySelector(selector);
                    },

                    queryAll(selector) {
                        return document.querySelectorAll(selector);
                    },

                    create(tagName) {
                        return document.createElement(tagName);
                    }
                }
            }
        };

        SANDBOXES.set(extensionId, sandbox);

        return sandbox;
    }

    function destroy(extensionId) {
        if (!SANDBOXES.has(extensionId)) {
            return;
        }

        SANDBOXES.delete(extensionId);
    }

    function get(extensionId) {
        return SANDBOXES.get(extensionId) || null;
    }

    function has(extensionId) {
        return SANDBOXES.has(extensionId);
    }

    function getAll() {
        return Array.from(SANDBOXES.values());
    }

    window.AOI_EXTENSION_SANDBOX = {
        create,
        destroy,
        get,
        has,
        getAll
    };
})(); 
