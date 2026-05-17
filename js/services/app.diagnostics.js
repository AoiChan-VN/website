// js/services/app.diagnostics.js

import { AppEvents } from './app.events.js';

class AppDiagnostics {

    constructor() {
        this.reports = [];
    }

    initialize() {

        this.captureEnvironment();

        AppEvents.emit(
            'diagnostics:ready'
        );
    }

    captureEnvironment() {

        const report = {
            userAgent:
                navigator.userAgent,
            language:
                navigator.language,
            online:
                navigator.onLine,
            timestamp:
                Date.now()
        };

        this.reports.push(report);

        AppEvents.emit(
            'diagnostics:captured',
            report
        );
    }

    generate() {

        return {
            reports:
                [...this.reports],
            timestamp:
                Date.now()
        };
    }

    clear() {

        this.reports = [];

        AppEvents.emit(
            'diagnostics:clear'
        );
    }
}

const AppDiagnosticsRuntime =
    new AppDiagnostics();

export {
    AppDiagnosticsRuntime
}; 
