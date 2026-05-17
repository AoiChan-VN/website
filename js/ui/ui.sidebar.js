// js/ui/ui.sidebar.js

import { AppEvents } from '../services/app.events.js';

class UISidebar {

    constructor() {
        this.opened = true;
    }

    initialize() {

        this.bind();

        AppEvents.emit(
            'ui_sidebar:ready'
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
                        '[data-sidebar-toggle]'
                    )
                ) {

                    this.toggle();
                }
            }
        );
    }

    toggle() {

        this.opened =
            !this.opened;

        document.body.dataset.sidebar =
            this.opened
                ? 'open'
                : 'closed';

        AppEvents.emit(
            'ui_sidebar:toggle',
            {
                opened:
                    this.opened
            }
        );
    }
}

const UISidebarRuntime =
    new UISidebar();

export {
    UISidebarRuntime
};
