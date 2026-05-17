// js/ui/ui.layout.js

import { AppEvents } from '../services/app.events.js';

class UILayout {

    constructor() {
        this.root = null;
    }

    initialize() {

        this.root =
            document.querySelector(
                '#app'
            );

        AppEvents.emit(
            'ui_layout:ready'
        );
    }

    mount(template = '') {

        if (!this.root) {
            return;
        }

        this.root.innerHTML =
            template;

        AppEvents.emit(
            'ui_layout:mounted'
        );
    }

    clear() {

        if (!this.root) {
            return;
        }

        this.root.innerHTML = '';

        AppEvents.emit(
            'ui_layout:clear'
        );
    }
}

const UILayoutRuntime =
    new UILayout();

export {
    UILayoutRuntime
}; 
