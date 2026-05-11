import { registry } from './Registry.js';
import { eventBus } from '../system/EventBus.js';

class WindowManager {
    #windows = new Map();
    #topZ = 1000;

    open(appId, title, ContentClass) {
        if (this.#windows.has(appId)) return this.focus(appId);

        const WinClass = registry.resolveComponent('Window');
        const win = new WinClass({ id: appId, title, content: new ContentClass() });
        
        const layer = document.getElementById('aoi-window-layer');
        win.mount(layer);
        
        this.#windows.set(appId, win);
        this.focus(appId);
    }

    focus(appId) {
        this.#topZ++;
        eventBus.emit('WINDOW_FOCUS', { id: appId, zIndex: this.#topZ });
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
