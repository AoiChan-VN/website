// js/ui/ui.browser.js

import { AppEvents } from '../services/app.events.js';

class UIBrowser {

    constructor() {
        this.viewport = null;
    }

    initialize() {

        this.viewport =
            document.querySelector(
                '[data-browser-viewport]'
            );

        AppEvents.emit(
            'ui_browser:ready'
        );
    }

    render(url = '') {

        if (!this.viewport) {
            return;
        }

        this.viewport.innerHTML = `
            <iframe
                class="browser-frame"
                src="${url}">
            </iframe>
        `;

        AppEvents.emit(
            'ui_browser:render',
            {
                url
            }
        );
    }

    clear() {

        if (!this.viewport) {
            return;
        }

        this.viewport.innerHTML = '';

        AppEvents.emit(
            'ui_browser:clear'
        );
    }
}

const UIBrowserRuntime =
    new UIBrowser();

export {
    UIBrowserRuntime
};
