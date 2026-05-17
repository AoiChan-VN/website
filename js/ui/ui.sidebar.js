// js/ui/ui.sidebar.js

import { AppEvents } from '../services/app.events.js';

class UISidebar {

    constructor() {
        this.sidebar = null;
        this.toggleButton = null;
    }

    initialize() {

        this.sidebar = document.querySelector('.aoi-sidebar');
        this.toggleButton = document.querySelector('[data-sidebar-toggle]');

        if (!this.sidebar) {
            return;
        }

        this.bindEvents();
    }

    bindEvents() {

        if (this.toggleButton) {

            this.toggleButton.addEventListener('click', () => {
                this.toggle();
            });
        }

        document.addEventListener('click', (event) => {

            const item = event.target.closest('[data-route]');

            if (!item) {
                return;
            }

            this.setActive(item);
        });
    }

    toggle() {

        this.sidebar.classList.toggle('is-open');

        AppEvents.emit('sidebar:toggle', {
            open: this.sidebar.classList.contains('is-open')
        });
    }

    setActive(target) {

        const items = this.sidebar.querySelectorAll('.aoi-sidebar__item');

        items.forEach((item) => {
            item.classList.remove('is-active');
        });

        target.classList.add('is-active');
    }
}

const SidebarUI = new UISidebar();

export {
    SidebarUI
};
