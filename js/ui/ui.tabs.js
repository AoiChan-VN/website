// js/ui/ui.tabs.js

import { AppEvents } from '../services/app.events.js';

class UITabs {

    constructor() {
        this.container = null;
    }

    initialize() {

        this.container =
            document.querySelector(
                '[data-tabs]'
            );

        AppEvents.emit(
            'ui_tabs:ready'
        );
    }

    render(tabs = []) {

        if (!this.container) {
            return;
        }

        this.container.innerHTML =
            tabs.map((tab) => {

                return `
                    <button
                        class="ui-tab"
                        data-tab-id="${tab.id}">
                        ${tab.title}
                    </button>
                `;
            }).join('');

        AppEvents.emit(
            'ui_tabs:render',
            {
                total:
                    tabs.length
            }
        );
    }
}

const UITabsRuntime =
    new UITabs();

export {
    UITabsRuntime
}; 
