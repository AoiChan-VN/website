import { state } from '../core/state.js';

export function registerCleanup(
    callback
) {

    state.cleanup.push(
        callback
    );

}

export function runCleanup() {

    state.cleanup.forEach(
        callback => {

            try {

                callback();

            } catch {}

        }
    );

    state.cleanup = [];

} 
