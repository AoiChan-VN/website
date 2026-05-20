export class StateManager {
    #state;
    #listeners;

    constructor(initialState = {}) {
        this.#state = structuredClone(
            initialState
        );

        this.#listeners = new Set();
    }

    getState() {
        return structuredClone(this.#state);
    }

    setState(partialState = {}) {
        this.#state = Object.freeze({
            ...this.#state,
            ...partialState
        });

        queueMicrotask(() => {
            this.#listeners.forEach(
                (listener) => {
                    listener(this.getState());
                }
            );
        });
    }

    subscribe(listener) {
        this.#listeners.add(listener);

        return () => {
            this.#listeners.delete(listener);
        };
    }

    destroy() {
        this.#listeners.clear();
    }
}
