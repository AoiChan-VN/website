import { Registry } from '../runtime/Registry.js';
import { Store } from '../reactivity/Store.js';
import { PluginLoader } from './Plugin.js';
import { LoggerPlugin } from '../plugins/LoggerPlugin.js';
import { AppShell } from '../components/AppShell/AppShell.js';

class Kernel {
    async boot() {
        try {
            // 1. Khởi tạo Global State
            this.#initGlobalState();

            // 2. Load Plugins
            await PluginLoader.load(this, registry, [LoggerPlugin]);

            // 3. Register Core Components
            registry.registerComponent('AppShell', AppShell);

            this.#launchUI();
        } catch (error) {
            console.error('Kernel Panic:', error);
        }
    }

    #initGlobalState() {
        store.define('user', { name: 'Guest', role: 'admin' });
        store.define('theme', 'dark');
        store.define('isSidebarOpen', true);
        
        // Debug mode
        window.__AOI_DEBUG_STATE__ = store; 
    }

    #launchUI() {
        const root = document.getElementById('aoi-runtime-root');
        const ShellClass = registry.resolveComponent('AppShell');
        const shell = new ShellClass({ title: 'AOI OS PRO' });
        shell.mount(root);
    }
}

export const kernel = new Kernel();
