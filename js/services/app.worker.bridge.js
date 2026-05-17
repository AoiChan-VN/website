// js/services/app.worker.bridge.js

import { AppEvents } from './app.events.js';

class AppWorkerBridge {

    constructor() {
        this.workers = new Map();
    }

    initialize() {

        AppEvents.emit(
            'worker_bridge:ready'
        );
    }

    register(name, worker) {

        if (!name || !worker) {
            return;
        }

        this.workers.set(
            name,
            worker
        );

        worker.addEventListener(
            'message',
            (event) => {

                this.handleMessage(
                    name,
                    event.data
                );
            }
        );

        AppEvents.emit(
            'worker_bridge:register',
            {
                name
            }
        );
    }

    handleMessage(
        worker,
        payload = {}
    ) {

        AppEvents.emit(
            'worker_bridge:message',
            {
                worker,
                payload
            }
        );
    }

    send(
        workerName,
        payload = {}
    ) {

        const worker =
            this.workers.get(workerName);

        if (!worker) {
            return;
        }

        worker.postMessage(payload);

        AppEvents.emit(
            'worker_bridge:send',
            {
                worker: workerName
            }
        );
    }

    broadcast(payload = {}) {

        this.workers.forEach((worker) => {

            worker.postMessage(payload);
        });

        AppEvents.emit(
            'worker_bridge:broadcast'
        );
    }

    unregister(name) {

        const worker =
            this.workers.get(name);

        if (!worker) {
            return;
        }

        worker.terminate();

        this.workers.delete(name);

        AppEvents.emit(
            'worker_bridge:unregister',
            {
                name
            }
        );
    }

    getWorkers() {

        return Array.from(
            this.workers.keys()
        );
    }
}

const AppWorkerBridgeRuntime =
    new AppWorkerBridge();

export {
    AppWorkerBridgeRuntime
}; 
