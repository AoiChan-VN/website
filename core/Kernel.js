import { Registry } from '../runtime/Registry.js';
import { Router } from '../runtime/Router.js';
import { DesktopPage } from '../pages/DesktopPage.js';
import { SettingsPage } from '../pages/SettingsPage.js'; // Giả định đã tạo tương tự DesktopPage
import { AppShell } from '../components/AppShell/AppShell.js';

class Kernel {
    async boot() {
        try {
            // 1. Đăng ký Pages vào Registry
            registry.registryComponent('Taskbar', Taskbar);
            registry.registryComponent('Window', Window);
            registry.registerComponent('DesktopPage', DesktopPage);
            registry.registerComponent('SettingsPage', SettingsPage);
            registry.registerComponent('AppShell', AppShell);
            
            // 2. Khởi tạo UI Shell
            this.#launchUI();

            // 3. Navigate về trang mặc định thông qua VFS
            Router.navigate('aoi:/desktop');
            
        } catch (error) {
            console.error('Kernel Panic:', error);
        }
    }

    #launchUI() {
        const root = document.getElementById('aoi-runtime-root');
        const ShellClass = registry.resolveComponent('AppShell');
        const shell = new ShellClass();
        shell.mount(root);
    }
}

export const kernel = new Kernel();
