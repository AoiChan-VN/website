export class EventSystem {
    #events;

    constructor() {
        this.#events = [];
    }

    delegate({
        parent,
        selector,
        type,
        handler,
        options = {}
    }) {
        const delegatedHandler = (event) => {
            const target =
                event.target.closest(selector);

            if (!target) {
                return;
            }

            handler(event, target);
        };

        parent.addEventListener(
            type,
            delegatedHandler,
            options
        );

        this.#events.push({
            parent,
            type,
            delegatedHandler
        });
    }

    destroy() {
        this.#events.forEach((eventItem) => {
            eventItem.parent.removeEventListener(
                eventItem.type,
                eventItem.delegatedHandler
            );
        });

        this.#events.length = 0;
    }
} 
