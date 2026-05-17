// js/services/app.performance.js

import { AppEvents } from './app.events.js';

class AppPerformance {

    constructor() {
        this.metrics = new Map();
    }

    initialize() {

        AppEvents.emit(
            'performance:ready'
        );
    }

    start(label) {

        if (!label) {
            return;
        }

        this.metrics.set(label, {
            start:
                performance.now()
        });

        AppEvents.emit(
            'performance:start',
            {
                label
            }
        );
    }

    end(label) {

        const metric =
            this.metrics.get(label);

        if (!metric) {
            return null;
        }

        const duration =
            performance.now() -
            metric.start;

        const result = {
            label,
            duration,
            completedAt:
                Date.now()
        };

        this.metrics.set(
            label,
            result
        );

        AppEvents.emit(
            'performance:end',
            result
        );

        return result;
    }

    get(label) {

        return this.metrics.get(label)
            || null;
    }

    getAll() {

        return Object.fromEntries(
            this.metrics.entries()
        );
    }

    clear() {

        this.metrics.clear();

        AppEvents.emit(
            'performance:clear'
        );
    }
}

const AppPerformanceRuntime =
    new AppPerformance();

export {
    AppPerformanceRuntime
}; 
