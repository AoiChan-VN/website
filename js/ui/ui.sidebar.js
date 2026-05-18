// js/ui/ui.sidebar.js

import { AppEvents } from '../services/app.events.js';

class UISidebar {

    constructor() {
        this.container = null;

        this.items = [
            {
                id: 'home',
                label: 'Home'
            },
            {
                id: 'browser',
                label: 'Browser'
            },
            {
                id: 'extensions',
                label: 'Extensions'
            },
            {
                id: 'settings',
                label: 'Settings'
            }
        ];
    }

    initialize() {

        this.container =
            document.querySelector(
                '.app-sidebar'
            );

        if (!this.container) {
            return;
        }

        this.render();

        this.bindEvents();

        AppEvents.emit(
            'ui_sidebar:ready'
        );
    }

    render() {

        this.container.innerHTML = `
            <div class="sidebar-header">

                <div class="sidebar-logo">
                    <div class="sidebar-logo-icon"></div>

                    <span>AOI</span>
                </div>

            </div>

            <div class="sidebar-nav">

                <div class="sidebar-nav-group">

                    <div class="sidebar-nav-title">
                        Runtime
                    </div>

                    ${this.items.map((item) => {

                        return `
                            <button
                                class="sidebar-nav-item"
                                data-sidebar="${item.id}"
                            >
                                <span
                                    class="sidebar-nav-icon"
                                >
                                    ◈
                                </span>

                                <span>
                                    ${item.label}
                                </span>
                            </button>
                        `;
                    }).join('')}

                </div>

            </div>

            <div class="sidebar-footer">

                <div class="sidebar-profile">

                    <div class="sidebar-avatar"></div>

                    <div class="sidebar-user">

                        <div class="sidebar-username">
                            Runtime User
                        </div>

                        <div class="sidebar-status">
                            System Online
                        </div>

                    </div>

                </div>

            </div>
        `;
    }

    bindEvents() {

        this.container.addEventListener(
            'click',
            (event) => {

                const target =
                    event.target.closest(
                        '[data-sidebar]'
                    );

                if (!target) {
                    return;
                }

                this.select(
                    target.dataset.sidebar
                );
            }
        );
    }

    select(id) {

        this.container
            .querySelectorAll(
                '.sidebar-nav-item'
            )
            .forEach((item) => {

                item.classList.remove(
                    'is-active'
                );
            });

        const active =
            this.container.querySelector(
                `[data-sidebar="${id}"]`
            );

        if (active) {

            active.classList.add(
                'is-active'
            );
        }

        AppEvents.emit(
            'ui_sidebar:select',
            {
                id
            }
        );
    }
}

const UISidebarRuntime =
    new UISidebar();

export {
    UISidebarRuntime
};
