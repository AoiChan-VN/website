// js/services/app.performance.js

import { AppEvents } from './app.events.js';

class AppPerformance {

    constructor() {
        this.metrics = {
            fps: 0,
            frameTime: 0,
            frames: 0
        };

        this.lastFrame = performance.now();

        this.running = false;
    }

    initialize() {

        this.running = true;

        this.loop();

        AppEvents.emit(
            'performance:ready'
        );
    }

    loop() {

        if (!this.running) {
            return;
        }

        requestAnimationFrame((time) => {

            const delta =
                time - this.lastFrame;

            this.lastFrame = time;

            this.metrics.frameTime =
                delta;

            this.metrics.fps =
                Math.round(1000 / delta);

            this.metrics.frames += 1;

            AppEvents.emit(
                'performance:update',
                {
                    metrics: this.metrics
                }
            );

            this.loop();
        });
    }

    stop() {

        this.running = false;

        AppEvents.emit(
            'performance:stop'
        );
    }

    getMetrics() {

        return {
            ...this.metrics
        };
    }

    reset() {

        this.metrics = {
            fps: 0,
            frameTime: 0,
            frames: 0
        };

        AppEvents.emit(
            'performance:reset'
        );
    }
}

const AppPerformanceRuntime =
    new AppPerformance();

export {
    AppPerformanceRuntime
};
