import { registry } from '../runtime/Registry.js';
import { Renderer } from '../runtime/Renderer.js';

/**
 * Kernel: Điều phối quá trình boot và quản lý Runtime OS.
 */
class Kernel {
    async boot() {
        console.info('Aoi OS: Booting sequence started...');
        
        try {
            await this.#initSystemServices();
            this.#mountFileSystem();
            this.#launchInitialUI();
            
            console.info('Aoi OS: System Ready.');
        } catch (error) {
            console.error('Aoi OS: Kernel Panic', error);
        }
    }

    async #initSystemServices() {
        // Initialize Core Services (EventBus, State Manager)
    }

    #mountFileSystem() {
        // Prepare Virtual File System/Routes
    }

    #launchInitialUI() {
        const root = document.getElementById('aoi-runtime-root');
        const splash = Renderer.createElement('div', { className: 'aoi-splash' }, 'Aoi Runtime OS v1.0.0');
        Renderer.render(splash, root);
    }
}

export const kernel = new Kernel();
