// js/ui/ui.tabs.js

import { AppEvents } from '../services/app.events.js';

class UITabs {

    constructor() {
        this.container = null;
        this.tabs = new Map();

        this.activeTab = null;
    }

    initialize() {

        this.container = document.querySelector('.aoi-tabs');

        if (!this.container) {
            return;
        }

        this.bindEvents();
    }

    bindEvents() {

        this.container.addEventListener('click', (event) => {

            const tab = event.target.closest('[data-tab-id]');

            if (!tab) {
                return;
            }

            const close = event.target.closest('[data-tab-close]');

            if (close) {

                this.close(
                    tab.dataset.tabId
                );

                return;
            }

            this.activate(
                tab.dataset.tabId
            );
        });
    }

    create(payload = {}) {

        const id = payload.id || crypto.randomUUID();

        const element = document.createElement('button');

        element.className = 'aoi-tab';

        element.dataset.tabId = id;

        element.innerHTML = `
            <span class="aoi-tab__title">
                ${payload.title || 'New Tab'}
            </span>

            <span
                class="aoi-tab__close"
                data-tab-close>
                ×
            </span>
        `;

        this.container.appendChild(element);

        this.tabs.set(id, {
            id,
            title: payload.title || 'New Tab',
            element
        });

        this.activate(id);

        AppEvents.emit('tabs:create', {
            id
        });

        return id;
    }

    activate(id) {

        if (!this.tabs.has(id)) {
            return;
        }

        this.tabs.forEach((tab) => {
            tab.element.classList.remove('is-active');
        });

        const current = this.tabs.get(id);

        current.element.classList.add('is-active');

        this.activeTab = id;

        AppEvents.emit('tabs:activate', {
            id
        });
    }

    close(id) {

        if (!this.tabs.has(id)) {
            return;
        }

        const tab = this.tabs.get(id);

        tab.element.remove();

        this.tabs.delete(id);

        if (this.activeTab === id) {

            const next = this.tabs.values().next().value;

            if (next) {
                this.activate(next.id);
            }
        }

        AppEvents.emit('tabs:close', {
            id
        });
    }
}

const TabsUI = new UITabs();

export {
    TabsUI
};
