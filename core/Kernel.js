import { registry } from '../runtime/Registry.js';
import { AppShell } from '../components/AppShell/AppShell.js';
import { Window } from '../components/Window/Window.js';
import { Taskbar } from '../components/Taskbar/Taskbar.js';
import { windowManager } from '../runtime/WindowManager.js';

class Kernel {
    async boot() {
        // 1. Registry Setup
        registry.registerComponent('AppShell', AppShell);
        registry.registerComponent('Window', Window);
        registry.registerComponent('Taskbar', Taskbar);

        // 2. UI Bootstrapping
        const root = document.getElementById('aoi-runtime-root');
        const ShellClass = registry.resolveComponent('AppShell');
        const shell = new ShellClass({ title: 'AOI RUNTIME OS' });
        shell.mount(root);

        console.info('Aoi OS: Kernel Booted.');
    }
}
export const kernel = new Kernel();
