// js/ui/ui.settings.js

import { AppStorage } from '../services/app.storage.js';
import { AppEvents } from '../services/app.events.js';

class UISettings {

    constructor() {
        this.root = null;

        this.themeSelect = null;
    }

    initialize() {

        this.root = document.querySelector('.aoi-settings');

        if (!this.root) {
            return;
        }

        this.themeSelect = this.root.querySelector(
            '[data-setting-theme]'
        );

        this.bindEvents();

        this.restore();
    }

    bindEvents() {

        if (this.themeSelect) {

            this.themeSelect.addEventListener('change', (event) => {

                const value = event.target.value;

                this.setTheme(value);
            });
        }
    }

    restore() {

        const theme =
            AppStorage.get('theme', 'dark');

        this.setTheme(theme);

        if (this.themeSelect) {
            this.themeSelect.value = theme;
        }
    }

    setTheme(theme = 'dark') {

        document.documentElement.dataset.theme = theme;

        AppStorage.set('theme', theme);

        AppEvents.emit('theme:change', {
            theme
        });
    }
}

const SettingsUI = new UISettings();

export {
    SettingsUI
}; 
