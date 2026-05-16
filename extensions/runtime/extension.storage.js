/**
 * AOI EXTENSION STORAGE
 * isolated extension storage layer
 */

(function () {
    'use strict';

    const STORAGE_PREFIX = 'aoi:extension:';

    function buildKey(extensionId, key) {
        return `${STORAGE_PREFIX}${extensionId}:${key}`;
    }

    function set(extensionId, key, value) {
        try {
            const storageKey = buildKey(extensionId, key);

            localStorage.setItem(
                storageKey,
                JSON.stringify(value)
            );

            return true;
        } catch (error) {
            console.error(
                '[AOI EXTENSION STORAGE]',
                error
            );

            return false;
        }
    }

    function get(extensionId, key) {
        try {
            const storageKey = buildKey(extensionId, key);

            const raw = localStorage.getItem(storageKey);

            if (!raw) {
                return null;
            }

            return JSON.parse(raw);
        } catch (error) {
            console.error(
                '[AOI EXTENSION STORAGE]',
                error
            );

            return null;
        }
    }

    function remove(extensionId, key) {
        const storageKey = buildKey(extensionId, key);

        localStorage.removeItem(storageKey);
    }

    function clear(extensionId) {
        const prefix = `${STORAGE_PREFIX}${extensionId}:`;

        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(prefix)) {
                localStorage.removeItem(key);
            }
        });
    }

    function keys(extensionId) {
        const prefix = `${STORAGE_PREFIX}${extensionId}:`;

        return Object.keys(localStorage)
            .filter((key) => key.startsWith(prefix))
            .map((key) => key.replace(prefix, ''));
    }

    window.AOI_EXTENSION_STORAGE = {
        set,
        get,
        remove,
        clear,
        keys
    };
})(); 
