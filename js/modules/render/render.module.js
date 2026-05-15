// js/modules/render/render.module.js

import { AppEvents } from '../../services/app.events.js';

class RenderModule {

    constructor() {
        this.initialized = false;

        this.frame = null;
        this.rendering = false;

        this.callbacks = new Set();
    }

    async initialize() {

        if (this.initialized) {
            return;
        }

        this.bindEvents();

        this.initialized = true;

        AppEvents.emit('render:ready');
    }

    bindEvents() {

        AppEvents.on('render:start', () => {
            this.start();
        });

        AppEvents.on('render:stop', () => {
            this.stop();
        });
    }

    register(callback) {

        if (typeof callback !== 'function') {
            return;
        }

        this.callbacks.add(callback);
    }

    unregister(callback) {

        this.callbacks.delete(callback);
    }

    start() {

        if (this.rendering) {
            return;
        }

        this.rendering = true;

        this.loop();
    }

    stop() {

        this.rendering = false;

        if (this.frame) {
            cancelAnimationFrame(this.frame);
        }
    }

    loop() {

        if (!this.rendering) {
            return;
        }

        this.callbacks.forEach((callback) => {

            try {
                callback();

            } catch (error) {

                console.error(
                    '[AOI] Render Error',
                    error
                );
            }
        });

        this.frame = requestAnimationFrame(() => {
            this.loop();
        });
    }
}

const RenderRuntimeModule =
    new RenderModule();

export {
    RenderRuntimeModule
}; 
