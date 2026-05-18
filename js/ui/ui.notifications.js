// js/ui/ui.notifications.js

import { AppEvents } from '../services/app.events.js';

class UINotifications {

    constructor() {
        this.root = null;

        this.duration = 4000;
    }

    initialize() {

        this.createRoot();

        this.bindEvents();

        AppEvents.emit(
            'ui_notifications:ready'
        );
    }

    createRoot() {

        this.root =
            document.createElement('div');

        this.root.className =
            'notification-root';

        document.body.appendChild(
            this.root
        );
    }

    bindEvents() {

        AppEvents.on(
            'ui_notifications:push',
            (payload) => {

                this.push(payload);
            }
        );
    }

    push({
        title = 'Notification',
        message = '',
        type = 'default'
    }) {

        const element =
            document.createElement('div');

        element.className = `
            notification
            ${this.resolveType(type)}
        `;

        element.innerHTML = `
            <div class="notification-icon">
                ◈
            </div>

            <div class="notification-content">

                <div class="notification-title">
                    ${title}
                </div>

                <div class="notification-message">
                    ${message}
                </div>

            </div>

            <button
                class="notification-close"
            >
                ×
            </button>
        `;

        this.root.appendChild(
            element
        );

        const close =
            element.querySelector(
                '.notification-close'
            );

        close.addEventListener(
            'click',
            () => {

                this.remove(element);
            }
        );

        setTimeout(() => {

            this.remove(element);

        }, this.duration);

        AppEvents.emit(
            'ui_notifications:created',
            {
                type
            }
        );
    }

    remove(element) {

        if (
            !element ||
            !element.parentNode
        ) {
            return;
        }

        element.remove();

        AppEvents.emit(
            'ui_notifications:removed'
        );
    }

    resolveType(type) {

        switch (type) {

            case 'success':
                return 'is-success';

            case 'warning':
                return 'is-warning';

            case 'danger':
                return 'is-danger';

            default:
                return '';
        }
    }
}

const UINotificationsRuntime =
    new UINotifications();

export {
    UINotificationsRuntime
};
