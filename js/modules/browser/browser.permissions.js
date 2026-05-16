// js/modules/browser/browser.permissions.js

import { AppEvents } from '../../services/app.events.js';

class BrowserPermissions {

    constructor() {
        this.permissions = new Map();
    }

    initialize() {

        this.registerDefaults();

        AppEvents.emit('permissions:ready');
    }

    registerDefaults() {

        this.permissions.set('clipboard', false);
        this.permissions.set('notifications', false);
        this.permissions.set('camera', false);
        this.permissions.set('microphone', false);
        this.permissions.set('popups', false);
    }

    set(name, value = false) {

        this.permissions.set(
            name,
            Boolean(value)
        );

        AppEvents.emit('permissions:update', {
            name,
            value
        });
    }

    allow(name) {

        this.set(name, true);
    }

    deny(name) {

        this.set(name, false);
    }

    has(name) {

        return this.permissions.get(name) || false;
    }

    getAll() {

        return Object.fromEntries(
            this.permissions.entries()
        );
    }
}

const BrowserPermissionsModule =
    new BrowserPermissions();

export {
    BrowserPermissionsModule
}; 
