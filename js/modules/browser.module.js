// js/modules/browser/browser.module.js

import { AppEvents } from '../../services/app.events.js';
import { BrowserUI } from '../../ui/ui.browser.js';

class BrowserModule {

    constructor() {
        this.initialized = false;

        this.currentUrl = 'about:blank';
    }

    async initialize() {

        if (this.initialized) {
            return;
        }

        BrowserUI.initialize();

        this.bindEvents();

        this.initialized = true;

        AppEvents.emit('browser:ready');
    }

    bindEvents() {

        AppEvents.on('browser:navigated', ({ url }) => {

            this.currentUrl = url;

            this.updateState(url);
        });

        AppEvents.on('tabs:activate', ({ id }) => {

            AppEvents.emit('browser:tab_change', {
                id
            });
        });
    }

    navigate(url) {

        this.currentUrl = url;

        BrowserUI.navigate(url);
    }

    reload() {

        BrowserUI.load(this.currentUrl);

        AppEvents.emit('browser:reload', {
            url: this.currentUrl
        });
    }

    updateState(url) {

        document.documentElement.dataset.browser =
            'active';

        AppEvents.emit('browser:state', {
            url
        });
    }

    getCurrentUrl() {
        return this.currentUrl;
    }
}

const BrowserRuntimeModule =
    new BrowserModule();

export {
    BrowserRuntimeModule
}; 
