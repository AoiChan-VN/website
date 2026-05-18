// js/ui/ui.browser.js

import { AppEvents } from '../services/app.events.js';

class UIBrowser {

    constructor() {
        this.container = null;
    }

    initialize() {

        this.container =
            document.querySelector(
                '.app-topbar'
            );

        if (!this.container) {
            return;
        }

        this.render();

        this.bindEvents();

        AppEvents.emit(
            'ui_browser:ready'
        );
    }

    render() {

        this.container.innerHTML = `
            <div class="browser-toolbar">

                <div class="browser-navigation">

                    <button
                        class="browser-nav-button"
                        data-browser-action="back"
                    >
                        ←
                    </button>

                    <button
                        class="browser-nav-button"
                        data-browser-action="forward"
                    >
                        →
                    </button>

                    <button
                        class="browser-nav-button"
                        data-browser-action="refresh"
                    >
                        ↻
                    </button>

                </div>

                <div class="browser-addressbar">

                    <input
                        class="browser-address-input"
                        type="text"
                        placeholder="Search or enter URL"
                    />

                </div>

                <div class="browser-actions">

                    <button
                        class="browser-action"
                        data-browser-action="extensions"
                    >
                        ⌘
                    </button>

                    <button
                        class="browser-action"
                        data-browser-action="settings"
                    >
                        ⚙
                    </button>

                </div>

            </div>
        `;
    }

    bindEvents() {

        const input =
            this.container.querySelector(
                '.browser-address-input'
            );

        input.addEventListener(
            'keydown',
            (event) => {

                if (event.key !== 'Enter') {
                    return;
                }

                this.navigate(
                    input.value
                );
            }
        );

        this.container.addEventListener(
            'click',
            (event) => {

                const action =
                    event.target.closest(
                        '[data-browser-action]'
                    );

                if (!action) {
                    return;
                }

                AppEvents.emit(
                    'ui_browser:action',
                    {
                        action:
                            action.dataset
                                .browserAction
                    }
                );
            }
        );
    }

    navigate(value = '') {

        const query =
            value.trim();

        if (!query) {
            return;
        }

        AppEvents.emit(
            'ui_browser:navigate',
            {
                query
            }
        );
    }
}

const UIBrowserRuntime =
    new UIBrowser();

export {
    UIBrowserRuntime
};
