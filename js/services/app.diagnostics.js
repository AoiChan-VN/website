// js/services/app.diagnostics.js

import { AppEvents } from './app.events.js';

class AppDiagnostics {

    constructor() {
        this.runtime = {
            booted: false,
            workers: 0,
            memory: null,
            visibility: 'visible'
        };
    }

    initialize() {

        this.bindEvents();

        this.capture();

        AppEvents.emit(
            'diagnostics:ready'
        );
    }

    bindEvents() {

        AppEvents.on('app:booted', () => {

            this.runtime.booted = true;
        });

        AppEvents.on('worker:registered', () => {

            this.runtime.workers += 1;
        });

        AppEvents.on('visibility:update', ({
            visible
        }) => {

            this.runtime.visibility =
                visible
                    ? 'visible'
                    : 'hidden';
        });
    }

    capture() {

        if (
            performance &&
            performance.memory
        ) {

            this.runtime.memory = {
                limit:
                    performance.memory
                        .jsHeapSizeLimit,

                total:
                    performance.memory
                        .totalJSHeapSize,

                used:
                    performance.memory
                        .usedJSHeapSize
            };
        }
    }

    getRuntime() {

        return {
            ...this.runtime
        };
    }

    snapshot() {

        const snapshot = {
            ...this.runtime,
            timestamp: Date.now()
        };

        AppEvents.emit(
            'diagnostics:snapshot',
            {
                snapshot
            }
        );

        return snapshot;
    }
}

const AppDiagnosticsRuntime =
    new AppDiagnostics();

export {
    AppDiagnosticsRuntime
};
