// js/modules/browser/browser.sandbox.js

import { AppEvents } from '../../services/app.events.js';

class BrowserSandbox {

    constructor() {
        this.defaultPolicy = [
            'allow-scripts',
            'allow-forms',
            'allow-same-origin'
        ];
    }

    initialize() {

        this.bindEvents();

        AppEvents.emit('sandbox:ready');
    }

    bindEvents() {

        AppEvents.on('browser:iframe_created', ({
            iframe
        }) => {

            this.apply(iframe);
        });
    }

    apply(iframe) {

        if (!iframe) {
            return;
        }

        iframe.setAttribute(
            'sandbox',
            this.defaultPolicy.join(' ')
        );

        iframe.setAttribute(
            'referrerpolicy',
            'no-referrer'
        );

        iframe.setAttribute(
            'loading',
            'eager'
        );

        AppEvents.emit('sandbox:applied');
    }

    setPolicy(policy = []) {

        if (!Array.isArray(policy)) {
            return;
        }

        this.defaultPolicy = [...policy];
    }

    getPolicy() {

        return [...this.defaultPolicy];
    }
}

const BrowserSandboxModule =
    new BrowserSandbox();

export {
    BrowserSandboxModule
}; 
