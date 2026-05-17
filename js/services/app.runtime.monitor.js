// js/services/app.runtime.monitor.js

import { AppEvents } from './app.events.js';

class AppRuntimeMonitor {

    constructor() {
        this.state = {
            startedAt: Date.now(),
            uptime: 0,
            events: 0,
            errors: 0
        };

        this.interval = null;
    }

    initialize() {

        this.bindEvents();

        this.start();

        AppEvents.emit(
            'runtime_monitor:ready'
        );
    }

    bindEvents() {

        const originalEmit =
            AppEvents.emit.bind(
                AppEvents
            );

        AppEvents.emit = (
            event,
            payload = {}
        ) => {

            this.state.events += 1;

            if (
                event.includes('error')
            ) {

                this.state.errors += 1;
            }

            return originalEmit(
                event,
                payload
            );
        };
    }

    start() {

        if (this.interval) {
            return;
        }

        this.interval =
            setInterval(() => {

                this.state.uptime =
                    Date.now() -
                    this.state.startedAt;

            }, 1000);
    }

    stop() {

        clearInterval(
            this.interval
        );

        this.interval = null;

        AppEvents.emit(
            'runtime_monitor:stop'
        );
    }

    snapshot() {

        return {
            ...this.state
        };
    }

    reset() {

        this.state = {
            startedAt: Date.now(),
            uptime: 0,
            events: 0,
            errors: 0
        };

        AppEvents.emit(
            'runtime_monitor:reset'
        );
    }
}

const AppRuntimeMonitorRuntime =
    new AppRuntimeMonitor();

export {
    AppRuntimeMonitorRuntime
}; 
