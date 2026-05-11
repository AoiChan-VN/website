import { registry } from '../runtime/Registry.js';
import { eventBus } from '../system/EventBus.js';
import { AppService } from '../services/AppService.js';
import { Dashboard } from '../components/Dashboard/Dashboard.js';
import { AppShell } from '../components/AppShell/AppShell.js';

class Kernel {
    async boot() {
        try {
            // 1. Register Services
            registry.registerService('AppService', new AppService());

            // 2. Register Components
            registry.registerComponent('Dashboard', Dashboard);
            registry.registerComponent('AppShell', AppShell);

            // 3. Listen System Events
            eventBus.on('SYS_NOTIFICATION', (data) => {
                console.log(`[OS Notification]: ${data.message}`);
            });

            // 4. Initial Render
            this.#launchUI();
        } catch (error) {
            console.error('Kernel Panic:', error);
        }
    }

    #launchUI() {
        const rootContainer = document.getElementById('aoi-runtime-root');
        const ShellClass = registry.resolveComponent('AppShell');
        const shell = new ShellClass({ title: 'AOI RUNTIME OS' });
        
        shell.mount(rootContainer);
        
        // Mount Dashboard vào viewport chính
        const viewport = document.getElementById('aoi-main-viewport');
        const DashClass = registry.resolveComponent('Dashboard');
        const dash = new DashClass();
        dash.mount(viewport);
    }
}

export const kernel = new Kernel();
