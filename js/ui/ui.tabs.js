// js/ui/ui.tabs.js

import { AppEvents } from '../services/app.events.js';

class UITabs {

    constructor() {
        this.container = null;

        this.tabs = [
            {
                id: 'tab-home',
                title: 'New Tab'
            }
        ];

        this.active =
            'tab-home';
    }

    initialize() {

        this.container =
            document.querySelector(
                '.app-tabs'
            );

        if (!this.container) {
            return;
        }

        this.render();

        this.bindEvents();

        AppEvents.emit(
            'ui_tabs:ready'
        );
    }

    render() {

        this.container.innerHTML = `
            ${this.tabs.map((tab) => {

                return `
                    <div
                        class="tab-item ${
                            this.active === tab.id
                                ? 'is-active'
                                : ''
                        }"
                        data-tab="${tab.id}"
                    >

                        <div
                            class="tab-favicon"
                        ></div>

                        <div class="tab-title">
                            ${tab.title}
                        </div>

                        <button
                            class="tab-close"
                            data-close="${tab.id}"
                        >
                            ×
                        </button>

                    </div>
                `;
            }).join('')}

            <button class="tabs-create">
                +
            </button>
        `;
    }

    bindEvents() {

        this.container.addEventListener(
            'click',
            (event) => {

                const close =
                    event.target.closest(
                        '[data-close]'
                    );

                if (close) {

                    this.remove(
                        close.dataset.close
                    );

                    return;
                }

                const tab =
                    event.target.closest(
                        '[data-tab]'
                    );

                if (tab) {

                    this.select(
                        tab.dataset.tab
                    );

                    return;
                }

                const create =
                    event.target.closest(
                        '.tabs-create'
                    );

                if (create) {

                    this.create();
                }
            }
        );
    }

    create() {

        const id =
            `tab-${Date.now()}`;

        this.tabs.push({
            id,
            title: 'New Tab'
        });

        this.active = id;

        this.render();

        AppEvents.emit(
            'ui_tabs:create',
            {
                id
            }
        );
    }

    select(id) {

        this.active = id;

        this.render();

        AppEvents.emit(
            'ui_tabs:select',
            {
                id
            }
        );
    }

    remove(id) {

        if (this.tabs.length <= 1) {
            return;
        }

        this.tabs =
            this.tabs.filter((tab) => {

                return tab.id !== id;
            });

        if (this.active === id) {

            this.active =
                this.tabs[0]?.id || null;
        }

        this.render();

        AppEvents.emit(
            'ui_tabs:remove',
            {
                id
            }
        );
    }
}

const UITabsRuntime =
    new UITabs();

export {
    UITabsRuntime
}; 
