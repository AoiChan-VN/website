import { Registry } from './Registry.js';
import { EventBus } from '../system/EventBus.js';

/**
 * WindowManager: Quản lý danh sách các cửa sổ đang mở.
 */
class WindowManager {
    #windows = new Map();
    #topZIndex = 100;

    open(appId, ComponentClass, props = {}) {
        if (this.#windows.has(appId)) {
            this.focus(appId);
            return;
        }

        const windowId = `win-${appId}`;
        const WindowWrapper = registry.resolveComponent('Window');
        const winInstance = new WindowWrapper({
            id: windowId,
            title: props.title || appId,
            content: new ComponentClass(props)
        });

        const container = document.getElementById('aoi-window-layer');
        winInstance.mount(container);
        
        this.#windows.set(appId, winInstance);
        this.focus(appId);
    }

    focus(appId) {
        const win = this.#windows.get(appId);
        if (win) {
            this.#topZIndex++;
            win.setZIndex(this.#topZIndex);
            eventBus.emit('WINDOW_FOCUS', appId);
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
 
