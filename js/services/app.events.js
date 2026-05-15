// js/services/app.events.js

class AppEventsClass {

    constructor() {
        this.events = new Map();
    }

    on(event, callback) {

        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }

        this.events.get(event).add(callback);
    }

    off(event, callback) {

        if (!this.events.has(event)) {
            return;
        }

        this.events.get(event).delete(callback);
    }

    emit(event, payload = {}) {

        if (!this.events.has(event)) {
            return;
        }

        for (const callback of this.events.get(event)) {

            try {
                callback(payload);

            } catch (error) {

                console.error('[AOI] Event Error:', event, error);
            }
        }
    }

    once(event, callback) {

        const wrapper = (payload) => {

            callback(payload);

            this.off(event, wrapper);
        };

        this.on(event, wrapper);
    }

    clear(event) {

        if (!this.events.has(event)) {
            return;
        }

        this.events.delete(event);
    }

    clearAll() {
        this.events.clear();
    }
}

const AppEvents = new AppEventsClass();

export {
    AppEvents
}; 
