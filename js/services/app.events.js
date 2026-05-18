// js/services/app.events.js

class AppEventsClass {

    constructor() {

        this.events = new Map();
    }

    on(event, callback) {

        if (!this.events.has(event)) {

            this.events.set(
                event,
                []
            );
        }

        this.events
            .get(event)
            .push(callback);
    }

    emit(
        event,
        payload = {}
    ) {

        const listeners =
            this.events.get(event);

        if (!listeners) {
            return;
        }

        listeners.forEach((callback) => {

            callback(payload);
        });
    }

    off(event, callback) {

        const listeners =
            this.events.get(event);

        if (!listeners) {
            return;
        }

        this.events.set(
            event,
            listeners.filter((item) => {

                return item !== callback;
            })
        );
    }
}

const AppEvents =
    new AppEventsClass();

export {
    AppEvents
};
