/**
 * AOI EXTENSION EVENTS
 * isolated extension event bus
 */

(function () {
    'use strict';

    const EVENTS = new Map();

    function on(eventName, callback) {
        if (!EVENTS.has(eventName)) {
            EVENTS.set(eventName, new Set());
        }

        EVENTS.get(eventName).add(callback);
    }

    function off(eventName, callback) {
        if (!EVENTS.has(eventName)) {
            return;
        }

        EVENTS.get(eventName).delete(callback);
    }

    function emit(eventName, payload = {}) {
        if (!EVENTS.has(eventName)) {
            return;
        }

        for (const callback of EVENTS.get(eventName)) {
            try {
                callback(payload);
            } catch (error) {
                console.error(
                    `[AOI EXTENSION EVENT ERROR] ${eventName}`,
                    error
                );
            }
        }

        window.dispatchEvent(
            new CustomEvent(`aoi:event:${eventName}`, {
                detail: payload
            })
        );
    }

    function once(eventName, callback) {
        function wrapper(payload) {
            callback(payload);

            off(eventName, wrapper);
        }

        on(eventName, wrapper);
    }

    function clear(eventName) {
        if (!EVENTS.has(eventName)) {
            return;
        }

        EVENTS.delete(eventName);
    }

    function clearAll() {
        EVENTS.clear();
    }

    window.AOI_EXTENSION_EVENTS = {
        on,
        off,
        emit,
        once,
        clear,
        clearAll
    };
})(); 
