// js/ui/ui.settings.js

import { AppEvents } from '../services/app.events.js';

class UISettings {

    constructor() {
        this.panel = null;
    }

    initialize() {

        this.panel =
            document.querySelector(
                '[data-settings-panel]'
            );

        this.bind();

        AppEvents.emit(
            'ui_settings:ready'
        );
    }

    bind() {

        document.addEventListener(
            'click',
            (event) => {

                const target =
                    event.target;

                if (
                    target.matches(
                        '[data-settings-toggle]'
                    )
                ) {

                    this.toggle();
                }
            }
        );
    }

    toggle() {

        if (!this.panel) {
            return;
        }

        const opened =
            this.panel.dataset.open
                === 'true';

        this.panel.dataset.open =
            (!opened).toString();

        AppEvents.emit(
            'ui_settings:toggle',
            {
                opened:
                    !opened
            }
        );
    }
}

const UISettingsRuntime =
    new UISettings();

export {
    UISettingsRuntime
};
