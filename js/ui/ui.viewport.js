// js/ui/ui.viewport.js

import { AppEvents } from '../services/app.events.js';

class UIViewport {

    constructor() {
        this.container = null;

        this.pages = new Map();

        this.active = null;
    }

    initialize() {

        this.container =
            document.querySelector(
                '.app-viewport'
            );

        if (!this.container) {
            return;
        }

        this.render();

        this.bindEvents();

        AppEvents.emit(
            'ui_viewport:ready'
        );
    }

    render() {

        this.container.innerHTML = `
            <div class="browser-viewport">

                <div class="viewport-empty">

                    <div
                        class="viewport-empty-title"
                    >
                        AOI Runtime
                    </div>

                    <div>
                        Open a page to begin browsing
                    </div>

                </div>

            </div>
        `;
    }

    bindEvents() {

        AppEvents.on(
            'ui_browser:navigate',
            ({ query }) => {

                this.open(query);
            }
        );

        AppEvents.on(
            'ui_tabs:select',
            ({ id }) => {

                this.activate(id);
            }
        );
    }

    open(query) {

        const id =
            `page-${Date.now()}`;

        const page =
            document.createElement('div');

        page.className =
            'viewport-page is-active';

        page.dataset.page = id;

        page.innerHTML = `
            <iframe
                class="viewport-frame"
                src="${this.resolve(query)}"
            ></iframe>
        `;

        const viewport =
            this.container.querySelector(
                '.browser-viewport'
            );

        viewport
            .querySelectorAll(
                '.viewport-page'
            )
            .forEach((item) => {

                item.classList.remove(
                    'is-active'
                );
            });

        viewport.appendChild(page);

        this.pages.set(id, page);

        this.active = id;

        AppEvents.emit(
            'ui_viewport:open',
            {
                id,
                query
            }
        );
    }

    activate(id) {

        this.pages.forEach((page) => {

            page.classList.remove(
                'is-active'
            );
        });

        const target =
            this.pages.get(id);

        if (!target) {
            return;
        }

        target.classList.add(
            'is-active'
        );

        this.active = id;

        AppEvents.emit(
            'ui_viewport:activate',
            {
                id
            }
        );
    }

    resolve(query) {

        const value =
            query.trim();

        if (
            value.startsWith('http://') ||
            value.startsWith('https://')
        ) {

            return value;
        }

        return `
            https://www.google.com/search?q=${
                encodeURIComponent(value)
            }
        `;
    }
}

const UIViewportRuntime =
    new UIViewport();

export {
    UIViewportRuntime
}; 
