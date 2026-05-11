import { registry } from '../runtime/Registry.js';
import { LayoutManager } from '../runtime/LayoutManager.js';
import { AppShell } from '../components/AppShell/AppShell.js';

class Kernel {
    async boot() {
        try {
            // 1. Register Components
            registry.registerComponent('AppShell', AppShell);

            // 2. Resolve và Khởi tạo Root UI
            const rootContainer = document.getElementById('aoi-runtime-root');
            const ShellClass = registry.resolveComponent('AppShell');
            
            const shell = new ShellClass({ title: 'AOI RUNTIME v1.0.0' });
            shell.mount(rootContainer);

            console.log('Aoi OS: Shell Loaded.');
        } catch (error) {
            console.error('Kernel Panic:', error);
        }
    }
}

export const kernel = new Kernel();
