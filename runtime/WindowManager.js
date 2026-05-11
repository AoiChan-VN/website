import { registry } from './Registry.js';
import { eventBus } from '../system/EventBus.js';

class WindowManager {
    #windows = new Map();
    #topZIndex = 100;

    open(appId, title, ContentClass) {
        if (this.#windows.has(appId)) {
            this.focus(appId);
            return;
        }
        const WindowWrapper = registry.resolveComponent('Window');
        const win = new WindowWrapper({ id: appId, title, content: new ContentClass() });
        
        const container = document.getElementById('aoi-window-layer');
        win.mount(container);
        
        this.#windows.set(appId, win);
        this.focus(appId);
    }

    focus(appId) {
        this.#topZIndex++;
        const win = this.#windows.get(appId);
        if (win) {
            eventBus.emit('WINDOW_FOCUS', { id: appId, zIndex: this.#topZIndex });
        }
    }

    close(appId) {
        const win = this.#windows.get(appId);
        if (win) {
            win.destroy();
            this.#windows.delete(appId);
        }
    }
}
export const windowManager = new WindowManager();
