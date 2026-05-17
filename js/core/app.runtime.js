// js/core/app.runtime.js

import { AppEvents } from '../services/app.events.js';

import {
    AppBootstrapRuntime
} from './app.bootstrap.js';

import {
    AppExtensionRuntime
} from './app.extension.js';

class AppRuntime {

    constructor() {
        this.ready = false;

        this.workers = new Map();
    }

    async initialize() {

        if (this.ready) {
            return;
        }

        await AppBootstrapRuntime.initialize();

        await AppExtensionRuntime.initialize();

        this.initializeWorkers();

        this.bindEvents();

        this.ready = true;

        AppEvents.emit('runtime:ready');
    }

    initializeWorkers() {

        this.registerWorker(
            'runtime',
            './workers/runtime.worker.js'
        );

        this.registerWorker(
            'cache',
            './workers/cache.worker.js'
        );

        this.registerWorker(
            'sync',
            './workers/sync.worker.js'
        );

        this.registerWorker(
            'render',
            './workers/render.worker.js'
        );
    }

    registerWorker(name, path) {

        if (this.workers.has(name)) {
            return;
        }

        try {

            const worker =
                new Worker(path, {
                    type: 'module'
                });

            this.workers.set(name, worker);

            AppEvents.emit('worker:registered', {
                name
            });

        } catch (error) {

            console.error(
                '[AOI] Worker Register Error',
                error
            );
        }
    }

    bindEvents() {

        AppEvents.on('runtime:shutdown', () => {

            this.destroy();
        });
    }

    destroy() {

        this.workers.forEach((worker) => {

            worker.terminate();
        });

        this.workers.clear();

        this.ready = false;

        AppEvents.emit('runtime:destroyed');
    }

    getWorker(name) {

        return this.workers.get(name) || null;
    }
}

const AOIRuntime =
    new AppRuntime();

export {
    AOIRuntime
};
