// js/ui/ui.contextmenu.js

import { AppEvents } from '../services/app.events.js';

class UIContextMenu {

    constructor() {
        this.element = null;
    }

    initialize() {

        this.create();

        this.bind();

        AppEvents.emit(
            'ui_contextmenu:ready'
        );
    }

    create() {

        this.element =
            document.createElement(
                'div'
            );

        this.element.className =
            'ui-contextmenu';

        document.body.appendChild(
            this.element
        );
    }

    bind() {

        document.addEventListener(
            'contextmenu',
            (event) => {

                event.preventDefault();

                this.show(
                    event.clientX,
                    event.clientY
                );
            }
        );

        document.addEventListener(
            'click',
            () => {

                this.hide();
            }
        );
    }

    show(x, y) {

        if (!this.element) {
            return;
        }

        this.element.style.left =
            `${x}px`;

        this.element.style.top =
            `${y}px`;

        this.element.dataset.visible =
            'true';

        AppEvents.emit(
            'ui_contextmenu:show'
        );
    }

    hide() {

        if (!this.element) {
            return;
        }

        this.element.dataset.visible =
            'false';

        AppEvents.emit(
            'ui_contextmenu:hide'
        );
    }
}

const UIContextMenuRuntime =
    new UIContextMenu();

export {
    UIContextMenuRuntime
}; 
