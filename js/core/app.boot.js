// js/core/app.boot.js

import { AppRuntime } from './app.runtime.js';
import { AppRouter } from './app.router.js';
import { AppStorage } from '../services/app.storage.js';
import { AppEvents } from '../services/app.events.js';
import { WorkerBridge } from '../services/app.worker.js';

class AppBoot {
    constructor() {
        this.initialized = false;
    }

    async start() {
        if (this.initialized) {
            return;
        }

        try {
            document.documentElement.dataset.app = 'booting';

            await this.initializeStorage();
            await this.initializeWorkers();
            await this.initializeRuntime();
            await this.initializeRouter();

            this.bindSystemEvents();

            this.initialized = true;

            document.documentElement.dataset.app = 'ready';

            AppEvents.emit('app:ready');

        } catch (error) {

            document.documentElement.dataset.app = 'crashed';

            console.error('[AOI] Boot Failed', error);

            AppEvents.emit('app:crash', {
                error
            });
        }
    }

    async initializeStorage() {
        await AppStorage.initialize();

        AppEvents.emit('storage:ready');
    }

    async initializeWorkers() {
        await WorkerBridge.initialize();

        AppEvents.emit('workers:ready');
    }

    async initializeRuntime() {
        await AppRuntime.initialize();

        AppEvents.emit('runtime:ready');
    }

    async initializeRouter() {
        await AppRouter.initialize();

        AppEvents.emit('router:ready');
    }

    bindSystemEvents() {
        window.addEventListener('beforeunload', () => {
            AppEvents.emit('app:shutdown');
        });

        document.addEventListener('visibilitychange', () => {
            AppEvents.emit('app:visibility', {
                hidden: document.hidden
            });
        });
    }
}

const boot = new AppBoot();

window.addEventListener('DOMContentLoaded', async () => {
    await boot.start();
});

export {
    AppBoot,
    boot
}; 
