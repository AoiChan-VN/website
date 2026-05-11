import { registry } from '../runtime/Registry.js';
import { Scheduler } from '../scheduler/Scheduler.js';

class Kernel {
    async boot() {
        console.info('Aoi OS: Phase 2 Initializing...');
        
        try {
            // Register Scheduler as a System Service
            registry.registerService('scheduler', Scheduler);
            
            this.#launchInitialUI();
        } catch (error) {
            console.error('Aoi OS: Kernel Panic', error);
        }
    }

    #launchInitialUI() {
        const root = document.getElementById('aoi-runtime-root');
        // UI giờ đây sẽ được gọi thông qua Registry và Component Class ở Phase 3.
        root.innerHTML = `<div style="padding: 20px; color: #38bdf8;">
            [Kernel] Reactivity & Scheduler Engine: ONLINE
        </div>`;
    }
}

export const kernel = new Kernel();
