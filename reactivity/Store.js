import { createSignal } from './Signal.js';

/**
 * Global Store: Quản lý trạng thái tập trung dựa trên Signals.
 * Đảm bảo tính Reactivity xuyên suốt các components.
 */
class Store {
    #state = {};
    #selectors = new Map();

    define(key, initialValue) {
        const [read, write] = createSignal(initialValue);
        this.#state[key] = { read, write };
    }

    set(key, value) {
        if (!this.#state[key]) throw new Error(`State ${key} is not defined.`);
        this.#state[key].write(value);
    }

    get(key) {
        if (!this.#state[key]) throw new Error(`State ${key} is not defined.`);
        return this.#state[key].read();
    }
}

export const store = new Store();
 
