export class VisibilityManager {
    #callbacks;

    constructor() {
        this.#callbacks =
            new Set();
    }

    initialize() {
        document.addEventListener(
            'visibilitychange',
            this.handleVisibilityChange,
            {
                passive: true
            }
        );
    }

    handleVisibilityChange = () => {
        const isVisible =
            document.visibilityState ===
            'visible';

        this.#callbacks.forEach(
            (callback) => {
                callback(isVisible);
            }
        );
    };

    subscribe(callback) {
        this.#callbacks.add(callback);

        return () => {
            this.#callbacks.delete(
                callback
            );
        };
    }

    destroy() {
        document.removeEventListener(
            'visibilitychange',
            this.handleVisibilityChange
        );

        this.#callbacks.clear();
    }
} 
