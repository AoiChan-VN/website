// js/ui/ui.notifications.js

import { AppEvents } from '../services/app.events.js';

class UINotifications {

    constructor() {
        this.container = null;
    }

    initialize() {

        this.container =
            document.querySelector(
                '[data-notifications]'
            );

        AppEvents.emit(
            'ui_notifications:ready'
        );
    }

    push(message = '') {

        if (!this.container) {
            return;
        }

        const element =
            document.createElement('div');

        element.className =
            'ui-notification';

        element.textContent =
            message;

        this.container.appendChild(
            element
        );

        setTimeout(() => {

            element.remove();

        }, 4000);

        AppEvents.emit(
            'ui_notifications:push',
            {
                message
            }
        );
    }
}

const UINotificationsRuntime =
    new UINotifications();

export {
    UINotificationsRuntime
}; 
