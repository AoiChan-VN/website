// js/ui/ui.dialog.js

import { AppEvents } from '../services/app.events.js';

class UIDialog {

    constructor() {
        this.active = null;
    }

    initialize() {

        AppEvents.emit(
            'ui_dialog:ready'
        );
    }

    open(content = '') {

        this.close();

        const dialog =
            document.createElement(
                'div'
            );

        dialog.className =
            'ui-dialog';

        dialog.innerHTML = `
            <div class="ui-dialog-box">
                ${content}
            </div>
        `;

        document.body.appendChild(
            dialog
        );

        this.active = dialog;

        AppEvents.emit(
            'ui_dialog:open'
        );
    }

    close() {

        if (!this.active) {
            return;
        }

        this.active.remove();

        this.active = null;

        AppEvents.emit(
            'ui_dialog:close'
        );
    }
}

const UIDialogRuntime =
    new UIDialog();

export {
    UIDialogRuntime
}; 
