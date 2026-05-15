// js/core/app.runtime.js

import { AppEvents } from '../services/app.events.js';

class RuntimeState {
    constructor() {
        this.ready = false;
        this.startedAt = 0;

        this.flags = {
            booted: false,
            router: false,
            workers: false,
            storage: false
        };

        this.modules = new Map();
        this.services = new Map();
    }
}

class AppRuntimeClass {
    constructor() {
        this.state = new RuntimeState();
    }

    async initialize() {

        if (this.state.ready) {
            return;
        }

        this.state.startedAt = Date.now();

        this.bindEvents();

        this.state.flags.booted = true;
        this.state.ready = true;

        AppEvents.emit('runtime:initialized', {
            startedAt: this.state.startedAt
        });
    }

    bindEvents() {

        AppEvents.on('workers:ready', () => {
            this.state.flags.workers = true;
        });

        AppEvents.on('storage:ready', () => {
            this.state.flags.storage = true;
        });

        AppEvents.on('router:ready', () => {
            this.state.flags.router = true;
        });
    }

    registerModule(key, module) {

        if (this.state.modules.has(key)) {
            return;
        }

        this.state.modules.set(key, module);

        AppEvents.emit('runtime:module_registered', {
            key
        });
    }

    getModule(key) {
        return this.state.modules.get(key);
    }

    registerService(key, service) {

        if (this.state.services.has(key)) {
            return;
        }

        this.state.services.set(key, service);

        AppEvents.emit('runtime:service_registered', {
            key
        });
    }

    getService(key) {
        return this.state.services.get(key);
    }

    isReady() {
        return this.state.ready;
    }

    getState() {
        return this.state;
    }
}

const AppRuntime = new AppRuntimeClass();

export {
    AppRuntime
}; 
