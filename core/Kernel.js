import { registry } from '../runtime/Registry.js';
import { AppShell } from '../components/AppShell/AppShell.js';
import { Window } from '../components/Window/Window.js';
import { Taskbar } from '../components/Taskbar/Taskbar.js';
import { windowManager } from '../runtime/WindowManager.js';

class Kernel {
    async boot() {
        console.info("Aoi OS: Initializing Kernel...");

        // 1. Đăng ký toàn bộ Component hệ thống
        registry.registerComponent('AppShell', AppShell);
        registry.registerComponent('Window', Window);
        registry.registerComponent('Taskbar', Taskbar);

        // 2. Render Shell
        const root = document.getElementById('aoi-root');
        const ShellClass = registry.resolveComponent('AppShell');
        const shell = new ShellClass();
        shell.mount(root);

        // 3. Demo: Mở một cửa sổ mặc định
        setTimeout(() => {
            windowManager.open('welcome', 'Welcome App', class extends AppShell {
                render() { return Renderer.createElement('p', {}, 'Hello from Virtual App!'); }
            });
        }, 1000);
    }
}
export const kernel = new Kernel();
