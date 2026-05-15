// js/modules/tabs/tabs.module.js

import { AppEvents } from '../../services/app.events.js';
import { TabsUI } from '../../ui/ui.tabs.js';

class TabsModule {

    constructor() {
        this.initialized = false;

        this.tabs = new Map();
        this.active = null;
    }

    async initialize() {

        if (this.initialized) {
            return;
        }

        TabsUI.initialize();

        this.bindEvents();

        this.initialized = true;

        AppEvents.emit('tabs:ready');
    }

    bindEvents() {

        AppEvents.on('tabs:create', ({ id }) => {

            this.tabs.set(id, {
                id,
                createdAt: Date.now()
            });
        });

        AppEvents.on('tabs:activate', ({ id }) => {

            this.active = id;
        });

        AppEvents.on('tabs:close', ({ id }) => {

            this.tabs.delete(id);

            if (this.active === id) {
                this.active = null;
            }
        });
    }

    create(payload = {}) {

        return TabsUI.create(payload);
    }

    activate(id) {

        TabsUI.activate(id);
    }

    close(id) {

        TabsUI.close(id);
    }

    getActiveTab() {

        return this.active;
    }

    getTabs() {

        return Array.from(
            this.tabs.values()
        );
    }
}

const TabsRuntimeModule =
    new TabsModule();

export {
    TabsRuntimeModule
}; 
