import { registry } from '../runtime/Registry.js';
import { store } from '../reactivity/Store.js';
import { ModuleLoader } from '../runtime/ModuleLoader.js';
import { AppShell } from '../components/AppShell/AppShell.js';
import { Window } from '../components/Window/Window.js';
import { Taskbar } from '../components/Taskbar/Taskbar.js';
import { AppService } from '../services/AppService.js';

class Kernel {
    async boot() {
        try {
            console.info('Aoi OS: Booting Enterprise Runtime...');

            // 1. Initialize State & Services
            this.#initGlobalState();
            registry.registerService('AppService', new AppService());

            // 2. Register Core Components
            registry.registerComponent('AppShell', AppShell);
            registry.registerComponent('Window', Window);
            registry.registerComponent('Taskbar', Taskbar);

            // 3. Dynamic Module Loading
            const externalApps = [
                { id: 'RemoteNote', url: 'https://esm.sh' } // Example ESM URL
            ];
            for (const app of externalApps) {
                await ModuleLoader.registerExternalApp(registry, app);
            }

            // 4. Launch UI
            this.#launchUI();
        } catch (e) {
            console.error('Kernel Panic:', e);
        }
    }

    #initGlobalState() {
        store.define('theme', 'dark');
        store.define('user', 'Guest');
        store.define('activeWindows', []);
    }

    #launchUI() {
        const root = document.getElementById('aoi-runtime-root');
        const ShellClass = registry.resolveComponent('AppShell');
        const shell = new ShellClass({ title: 'AOI RUNTIME OS v1.0' });
        shell.mount(root);
    }
}
export const kernel = new Kernel();
