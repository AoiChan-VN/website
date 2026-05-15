// js/modules/tabs/tabs.persistence.js

import { AppStorage } from '../../services/app.storage.js';
import { AppEvents } from '../../services/app.events.js';

class TabsPersistence {

    constructor() {
        this.storageKey = 'tabs.runtime';

        this.state = {
            active: null,
            tabs: []
        };
    }

    initialize() {

        this.restore();

        this.bindEvents();
    }

    bindEvents() {

        AppEvents.on('tabs:create', ({ id }) => {

            this.state.tabs.push({
                id,
                createdAt: Date.now()
            });

            this.save();
        });

        AppEvents.on('tabs:activate', ({ id }) => {

            this.state.active = id;

            this.save();
        });

        AppEvents.on('tabs:close', ({ id }) => {

            this.state.tabs =
                this.state.tabs.filter(
                    (tab) => tab.id !== id
                );

            if (this.state.active === id) {
                this.state.active = null;
            }

            this.save();
        });
    }

    restore() {

        const stored =
            AppStorage.get(this.storageKey);

        if (!stored) {
            return;
        }

        this.state = {
            ...this.state,
            ...stored
        };

        AppEvents.emit('tabs:restored', {
            state: this.state
        });
    }

    save() {

        AppStorage.set(
            this.storageKey,
            this.state
        );

        AppEvents.emit('tabs:saved', {
            state: this.state
        });
    }

    getState() {
        return this.state;
    }
}

const TabsPersistenceModule =
    new TabsPersistence();

export {
    TabsPersistenceModule
}; 
