/**
 * AOI EXTENSION API
 * isolated public runtime bridge
 */

(function () {
    'use strict';

    const API = {
        version: '1.0.0',

        runtime: {
            install(extensionName) {
                return window.AOI_EXTENSION_LOADER.install(
                    extensionName
                );
            },

            uninstall(extensionName) {
                return window.AOI_EXTENSION_LOADER.uninstall(
                    extensionName
                );
            },

            enable(extensionName) {
                return window.AOI_EXTENSION_LOADER.enable(
                    extensionName
                );
            },

            disable(extensionName) {
                return window.AOI_EXTENSION_LOADER.disable(
                    extensionName
                );
            }
        },

        registry: {
            get(extensionId) {
                return window.AOI_EXTENSION_REGISTRY.get(
                    extensionId
                );
            },

            getAll() {
                return window.AOI_EXTENSION_REGISTRY.getAll();
            },

            has(extensionId) {
                return window.AOI_EXTENSION_REGISTRY.has(
                    extensionId
                );
            }
        },

        events: {
            emit(eventName, detail = {}) {
                window.dispatchEvent(
                    new CustomEvent(eventName, {
                        detail
                    })
                );
            },

            on(eventName, callback) {
                window.addEventListener(eventName, callback);
            },

            off(eventName, callback) {
                window.removeEventListener(eventName, callback);
            }
        },

        storage: {
            get(key) {
                try {
                    const raw = localStorage.getItem(key);

                    if (!raw) return null;

                    return JSON.parse(raw);
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },

            set(key, value) {
                try {
                    localStorage.setItem(
                        key,
                        JSON.stringify(value)
                    );

                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            },

            remove(key) {
                localStorage.removeItem(key);
            }
        },

        dom: {
            query(selector) {
                return document.querySelector(selector);
            },

            queryAll(selector) {
                return document.querySelectorAll(selector);
            },

            create(tagName, className = '') {
                const element = document.createElement(tagName);

                if (className) {
                    element.className = className;
                }

                return element;
            }
        }
    };

    Object.freeze(API);

    window.AOI_EXTENSION_API = API;
})(); 
