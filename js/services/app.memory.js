// js/services/app.memory.js

import { AppEvents } from './app.events.js';

class AppMemory {

    constructor() {
        this.snapshots = [];
    }

    initialize() {

        this.capture();

        AppEvents.emit(
            'memory:ready'
        );
    }

    capture() {

        if (
            !performance.memory
        ) {
            return null;
        }

        const snapshot = {
            used:
                performance.memory
                    .usedJSHeapSize,

            total:
                performance.memory
                    .totalJSHeapSize,

            limit:
                performance.memory
                    .jsHeapSizeLimit,

            timestamp:
                Date.now()
        };

        this.snapshots.push(snapshot);

        AppEvents.emit(
            'memory:capture',
            snapshot
        );

        return snapshot;
    }

    latest() {

        return this.snapshots.at(-1)
            || null;
    }

    getAll() {

        return [...this.snapshots];
    }

    clear() {

        this.snapshots = [];

        AppEvents.emit(
            'memory:clear'
        );
    }
}

const AppMemoryRuntime =
    new AppMemory();

export {
    AppMemoryRuntime
}; 
