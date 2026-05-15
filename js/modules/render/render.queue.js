// js/modules/render/render.queue.js

import { AppEvents } from '../../services/app.events.js';

class RenderQueue {

    constructor() {
        this.queue = [];
        this.processing = false;
    }

    initialize() {

        this.bindEvents();
    }

    bindEvents() {

        AppEvents.on('render:enqueue', ({ task }) => {

            this.enqueue(task);
        });
    }

    enqueue(task) {

        if (typeof task !== 'function') {
            return;
        }

        this.queue.push(task);

        this.process();
    }

    async process() {

        if (this.processing) {
            return;
        }

        this.processing = true;

        while (this.queue.length > 0) {

            const task = this.queue.shift();

            try {

                await task();

            } catch (error) {

                console.error(
                    '[AOI] Render Queue Error',
                    error
                );
            }
        }

        this.processing = false;

        AppEvents.emit('render:queue_empty');
    }

    clear() {

        this.queue = [];

        AppEvents.emit('render:queue_cleared');
    }

    size() {

        return this.queue.length;
    }
}

const RenderQueueModule =
    new RenderQueue();

export {
    RenderQueueModule
}; 
