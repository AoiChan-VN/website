// js/modules/render/render.scheduler.js

import { AppEvents } from '../../services/app.events.js';

class RenderScheduler {

    constructor() {
        this.tasks = new Map();

        this.running = false;
    }

    initialize() {

        this.bindEvents();

        AppEvents.emit('scheduler:ready');
    }

    bindEvents() {

        AppEvents.on('render:schedule', ({
            id,
            callback,
            delay
        }) => {

            this.schedule(
                id,
                callback,
                delay
            );
        });

        AppEvents.on('render:cancel', ({
            id
        }) => {

            this.cancel(id);
        });
    }

    schedule(
        id,
        callback,
        delay = 16
    ) {

        if (!id || typeof callback !== 'function') {
            return;
        }

        this.cancel(id);

        const timer = setTimeout(async () => {

            try {

                await callback();

            } catch (error) {

                console.error(
                    '[AOI] Scheduler Error',
                    error
                );
            }

            this.tasks.delete(id);

        }, delay);

        this.tasks.set(id, timer);

        AppEvents.emit('scheduler:scheduled', {
            id
        });
    }

    cancel(id) {

        const timer =
            this.tasks.get(id);

        if (!timer) {
            return;
        }

        clearTimeout(timer);

        this.tasks.delete(id);

        AppEvents.emit('scheduler:cancelled', {
            id
        });
    }

    clear() {

        this.tasks.forEach((timer) => {
            clearTimeout(timer);
        });

        this.tasks.clear();

        AppEvents.emit('scheduler:cleared');
    }
}

const RenderSchedulerModule =
    new RenderScheduler();

export {
    RenderSchedulerModule
}; 
