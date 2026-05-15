// js/services/app.worker.js

import { AppConfig } from '../core/app.config.js';
import { AppEvents } from './app.events.js';

class WorkerBridgeClass {

    constructor() {
        this.worker = null;
        this.connected = false;
    }

    async initialize() {

        if (this.connected) {
            return;
        }

        this.worker = new Worker(
            AppConfig.worker.main,
            {
                type: 'module'
            }
        );

        this.bindEvents();

        this.connected = true;

        AppEvents.emit('worker:connected');
    }

    bindEvents() {

        this.worker.addEventListener('message', (event) => {

            const payload = event.data;

            if (!payload?.type) {
                return;
            }

            AppEvents.emit(payload.type, payload.data || {});
        });

        this.worker.addEventListener('error', (error) => {

            console.error('[AOI] Worker Error', error);

            AppEvents.emit('worker:error', {
                error
            });
        });
    }

    send(type, data = {}) {

        if (!this.worker) {
            return;
        }

        this.worker.postMessage({
            type,
            data
        });
    }

    terminate() {

        if (!this.worker) {
            return;
        }

        this.worker.terminate();

        this.connected = false;

        AppEvents.emit('worker:terminated');
    }
}

const WorkerBridge = new WorkerBridgeClass();

export {
    WorkerBridge
}; 
