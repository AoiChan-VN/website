// js/modules/settings/settings.theme.js

import { AppStorage } from '../../services/app.storage.js';
import { AppEvents } from '../../services/app.events.js';

class ThemeSettingsModule {

    constructor() {
        this.storageKey = 'settings.theme';

        this.theme = 'dark';
    }

    initialize() {

        this.restore();

        this.bindEvents();
    }

    bindEvents() {

        AppEvents.on('theme:change', ({ theme }) => {

            this.theme = theme;

            this.apply(theme);

            this.save();
        });
    }

    restore() {

        const stored =
            AppStorage.get(
                this.storageKey,
                'dark'
            );

        this.theme = stored;

        this.apply(stored);

        AppEvents.emit('theme:restored', {
            theme: stored
        });
    }

    apply(theme) {

        document.documentElement.dataset.theme =
            theme;
    }

    save() {

        AppStorage.set(
            this.storageKey,
            this.theme
        );

        AppEvents.emit('theme:saved', {
            theme: this.theme
        });
    }

    getTheme() {
        return this.theme;
    }
}

const ThemeModule =
    new ThemeSettingsModule();

export {
    ThemeModule
}; 
