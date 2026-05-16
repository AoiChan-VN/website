// js/modules/render/render.visibility.js

import { AppEvents } from '../../services/app.events.js';

class RenderVisibility {

    constructor() {
        this.visible = true;
    }

    initialize() {

        this.bindEvents();

        this.sync();

        AppEvents.emit('visibility:ready');
    }

    bindEvents() {

        document.addEventListener(
            'visibilitychange',
            () => {

                this.sync();
            }
        );
    }

    sync() {

        this.visible =
            !document.hidden;

        document.documentElement.dataset.visibility =
            this.visible
                ? 'visible'
                : 'hidden';

        AppEvents.emit('visibility:update', {
            visible: this.visible
        });
    }

    isVisible() {

        return this.visible;
    }
}

const RenderVisibilityModule =
    new RenderVisibility();

export {
    RenderVisibilityModule
}; 
