import { BaseService } from './BaseService.js';
import { EventBus } from '../system/EventBus.js';

/**
 * AppService: Cung cấp danh sách ứng dụng và trạng thái hệ thống.
 */
export class AppService extends BaseService {
    #apps = [
        { id: 'settings', name: 'System Settings', icon: '⚙️', status: 'stable' },
        { id: 'explorer', name: 'File Explorer', icon: '📂', status: 'beta' },
        { id: 'terminal', name: 'Aoi Terminal', icon: '🐚', status: 'alpha' }
    ];

    async getInstalledApps() {
        // Giả lập fetch từ API/Static Data
        return new Promise(resolve => {
            setTimeout(() => resolve(this.#apps), 300);
        });
    }

    notifySystem(message) {
        eventBus.emit('SYS_NOTIFICATION', { message, timestamp: Date.now() });
    }
}
 
