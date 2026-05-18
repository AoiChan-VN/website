// js/ui/ui.settings.js

import { AppEvents } from '../services/app.events.js';

class UISettings {

    constructor() {
        this.modal = null;

        this.visible = false;

        this.theme = 'theme-default';
    }

    initialize() {

        this.create();

        this.bindEvents();

        AppEvents.emit(
            'ui_settings:ready'
        );
    }

    create() {

        this.modal =
            document.createElement('div');

        this.modal.className =
            'modal-root';

        this.modal.innerHTML = `
            <div class="modal">

                <div class="modal-header">

                    <div class="modal-title">
                        Settings
                    </div>

                    <button
                        class="modal-close"
                    >
                        ×
                    </button>

                </div>

                <div class="modal-content">

                    <div class="settings-section">

                        <div
                            class="settings-section-title"
                        >
                            Themes
                        </div>

                        <div class="home-actions">

                            <button
                                class="home-button"
                                data-theme="theme-default"
                            >
                                Default
                            </button>

                            <button
                                class="home-button"
                                data-theme="theme-glass"
                            >
                                Glass
                            </button>

                            <button
                                class="home-button"
                                data-theme="theme-neon"
                            >
                                Neon
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;

        document.body.appendChild(
            this.modal
        );
    }

    bindEvents() {

        AppEvents.on(
            'ui_browser:action',
            ({ action }) => {

                if (action !== 'settings') {
                    return;
                }

                this.toggle();
            }
        );

        this.modal.addEventListener(
            'click',
            (event) => {

                if (
                    event.target.classList.contains(
                        'modal-root'
                    )
                ) {

                    this.hide();
                }

                if (
                    event.target.closest(
                        '.modal-close'
                    )
                ) {

                    this.hide();
                }

                const theme =
                    event.target.closest(
                        '[data-theme]'
                    );

                if (theme) {

                    this.applyTheme(
                        theme.dataset.theme
                    );
                }
            }
        );
    }

    toggle() {

        this.visible
            ? this.hide()
            : this.show();
    }

    show() {

        this.visible = true;

        this.modal.classList.add(
            'is-visible'
        );

        AppEvents.emit(
            'ui_settings:show'
        );
    }

    hide() {

        this.visible = false;

        this.modal.classList.remove(
            'is-visible'
        );

        AppEvents.emit(
            'ui_settings:hide'
        );
    }

    applyTheme(theme) {

        document.body.classList.remove(
            'theme-default',
            'theme-glass',
            'theme-neon'
        );

        document.body.classList.add(
            theme
        );

        this.theme = theme;

        AppEvents.emit(
            'ui_settings:theme',
            {
                theme
            }
        );
    }
}

const UISettingsRuntime =
    new UISettings();

export {
    UISettingsRuntime
};
