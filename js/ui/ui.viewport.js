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

                const active =
                    document.querySelector(
                    '.tab-item.is-active'
                );

            let tabId =
                active?.dataset.tab;

            if (!tabId) {

                const created =
                    AppEvents.emit?.(
                        'ui_tabs:create'
                    );

                tabId =
                    created?.id;
            }

            this.open(
                tabId,
                query
            );
        }
    );

    AppEvents.on(
        'ui_tabs:select',
        ({ id }) => {

            this.activate(id);
        }
    );

    AppEvents.on(
        'ui_tabs:remove',
        ({ id }) => {

            this.remove(id);
        }
    );
}

open(tabId, query) {

    const viewport =
        this.container.querySelector(
            '.browser-viewport'
        );

    let page =
        this.pages.get(tabId);

    if (!page) {

        page =
            document.createElement('div');

        page.className =
            'viewport-page';

        page.dataset.page = tabId;

        page.innerHTML = `
            <iframe
                class="viewport-frame"
                sandbox="
                    allow-scripts
                    allow-same-origin
                    allow-forms
                "
                referrerpolicy="
                    no-referrer
                "
            ></iframe>
        `;

        viewport.appendChild(page);

        this.pages.set(
            tabId,
            page
        );
    }

    const frame =
        page.querySelector(
            '.viewport-frame'
        );

    frame.src =
        this.resolve(query);

    this.activate(tabId);

    AppEvents.emit(
        'ui_viewport:open',
        {
            id: tabId,
            query
        }
    );
}

remove(id) {

    const page =
        this.pages.get(id);

    if (!page) {
        return;
    }

    page.remove();

    this.pages.delete(id);

    if (this.active === id) {

        this.active = null;
    }

    AppEvents.emit(
        'ui_viewport:remove',
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
