// js/ui/ui.browser.js

import { AppEvents } from '../services/app.events.js';

class UIBrowser {

    constructor() {
        this.viewport = null;
        this.addressInput = null;
        this.iframe = null;
    }

    initialize() {

        this.viewport = document.querySelector('.aoi-browser');
        this.addressInput = document.querySelector(
            '.aoi-browser__address-input'
        );

        this.iframe = document.querySelector(
            '.aoi-browser__iframe'
        );

        if (!this.viewport) {
            return;
        }

        this.bindEvents();
    }

    bindEvents() {

        if (this.addressInput) {

            this.addressInput.addEventListener('keydown', (event) => {

                if (event.key !== 'Enter') {
                    return;
                }

                this.navigate(
                    this.addressInput.value
                );
            });
        }

        AppEvents.on('browser:navigate', ({ url }) => {
            this.load(url);
        });
    }

    navigate(url = '') {

        const normalized = this.normalizeUrl(url);

        this.load(normalized);

        AppEvents.emit('browser:navigated', {
            url: normalized
        });
    }

    load(url) {

        if (!this.iframe) {
            return;
        }

        this.iframe.src = url;

        if (this.addressInput) {
            this.addressInput.value = url;
        }
    }

    normalizeUrl(url) {

        if (!url) {
            return 'about:blank';
        }

        const hasProtocol =
            /^https?:\/\//i.test(url);

        if (hasProtocol) {
            return url;
        }

        return `https://${url}`;
    }
}

const BrowserUI = new UIBrowser();

export {
    BrowserUI
}; 
