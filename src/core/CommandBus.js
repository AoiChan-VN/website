export class CommandBus {
    #listeners;

    constructor() {
        this.#listeners =
            new Map();
    }

    on(command, callback) {
        if (
            !this.#listeners.has(command)
        ) {
            this.#listeners.set(
                command,
                new Set()
            );
        }

        this.#listeners
            .get(command)
            .add(callback);
    }

    emit(command, payload = {}) {
        const listeners =
            this.#listeners.get(command);

        if (!listeners) {
            return;
        }

        listeners.forEach((listener) => {
            listener(payload);
        });
    }

    off(command, callback) {
        const listeners =
            this.#listeners.get(command);

        if (!listeners) {
            return;
        }

        listeners.delete(callback);
    }

    destroy() {
        this.#listeners.clear();
    }
} 
