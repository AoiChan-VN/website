// js/modules/tabs/tabs.virtual.js

import { AppEvents } from '../../services/app.events.js';

class VirtualTabs {

    constructor() {
        this.pool = new Map();

        this.limit = 12;
    }

    initialize() {

        this.bindEvents();

        AppEvents.emit('virtual_tabs:ready');
    }

    bindEvents() {

        AppEvents.on('tabs:create', ({ id }) => {

            this.mount(id);
        });

        AppEvents.on('tabs:close', ({ id }) => {

            this.unmount(id);
        });
    }

    mount(id) {

        if (this.pool.has(id)) {
            return;
        }

        if (this.pool.size >= this.limit) {

            const oldest =
                this.pool.keys().next().value;

            this.unmount(oldest);
        }

        this.pool.set(id, {
            id,
            mountedAt: Date.now(),
            visible: false
        });

        AppEvents.emit('virtual_tabs:mounted', {
            id
        });
    }

    unmount(id) {

        if (!this.pool.has(id)) {
            return;
        }

        this.pool.delete(id);

        AppEvents.emit('virtual_tabs:unmounted', {
            id
        });
    }

    activate(id) {

        this.pool.forEach((tab) => {
            tab.visible = false;
        });

        const target =
            this.pool.get(id);

        if (!target) {
            return;
        }

        target.visible = true;

        AppEvents.emit('virtual_tabs:activated', {
            id
        });
    }

    getAll() {

        return Array.from(
            this.pool.values()
        );
    }
}

const VirtualTabsModule =
    new VirtualTabs();

export {
    VirtualTabsModule
}; 
