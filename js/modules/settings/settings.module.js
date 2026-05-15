// js/modules/settings/settings.module.js

import { AppEvents } from '../../services/app.events.js';
import { SettingsUI } from '../../ui/ui.settings.js';

class SettingsModule {

    constructor() {
        this.initialized = false;

        this.settings = {
            theme: 'dark',
            animations: true
        };
    }

    async initialize() {

        if (this.initialized) {
            return;
        }

        SettingsUI.initialize();

        this.bindEvents();

        this.initialized = true;

        AppEvents.emit('settings:ready');
    }

    bindEvents() {

        AppEvents.on('theme:change', ({ theme }) => {

            this.settings.theme = theme;
        });
    }

    set(key, value) {

        this.settings[key] = value;

        AppEvents.emit('settings:update', {
            key,
            value
        });
    }

    get(key) {

        return this.settings[key];
    }

    getAll() {

        return {
            ...this.settings
        };
    }
}

const SettingsRuntimeModule =
    new SettingsModule();

export {
    SettingsRuntimeModule
}; 
