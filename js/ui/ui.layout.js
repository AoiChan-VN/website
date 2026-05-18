// js/ui/ui.layout.js

import { AppEvents } from '../services/app.events.js';

class UILayout {

    constructor() {
        this.root = null;
    }

    initialize() {

        this.root =
            document.querySelector('#app');

        if (!this.root) {
            return;
        }

        this.render();

        this.bindEvents();

        AppEvents.emit(
            'ui_layout:ready'
        );
    }

    render() {

        this.root.innerHTML = `
            <div class="app-sidebar"></div>

            <div class="app-runtime">

                <div class="app-topbar"></div>

                <div class="app-tabs"></div>

                <div class="app-viewport"></div>

                <div class="app-statusbar">
                    AOI Runtime Ready
                </div>

            </div>
        `;
    }

    bindEvents() {

        window.addEventListener(
            'resize',
            () => {

                AppEvents.emit(
                    'ui_layout:resize',
                    {
                        width:
                            window.innerWidth,

                        height:
                            window.innerHeight
                    }
                );
            }
        );
    }
}

const UILayoutRuntime =
    new UILayout();

export {
    UILayoutRuntime
};
