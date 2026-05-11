import { VFS } from '../system/VFS.js';
import { Registr } from './Registry.js';
import { EventBus } from '../system/EventBus.js';

/**
 * OS Router: Chuyển đổi VFS path thành UI View.
 */
export class Router {
    static #currentPath = null;

    static navigate(path) {
        const node = vfs.resolve(path);
        
        if (!node || node.type !== 'page') {
            console.error(`Aoi OS: Cannot navigate to ${path}`);
            return;
        }

        this.#currentPath = path;
        const componentName = node.component;
        
        eventBus.emit('ROUTER_CHANGE', { 
            path, 
            component: registry.resolveComponent(componentName) 
        });
    }

    static getCurrentPath() {
        return this.#currentPath;
    }
}
 
