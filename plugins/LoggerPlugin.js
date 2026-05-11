import { Plugin } from '../core/Plugin.js';
import { eventBus } from '../system/EventBus.js';

/**
 * LoggerPlugin: Tự động ghi lại mọi EventBus activity vào System Log.
 */
export class LoggerPlugin extends Plugin {
    constructor() {
        super('SystemLogger');
    }

    install(kernel, registry) {
        // Intercept mọi thông báo hệ thống
        eventBus.on('SYS_NOTIFICATION', (data) => {
            console.warn(`[LOGGER] Trace: ${data.message} at ${new Date(data.timestamp).toLocaleTimeString()}`);
        });

        // Đăng ký một công cụ debug vào registry
        registry.registerService('LoggerUtil', {
            dumpState: () => console.table(window.__AOI_DEBUG_STATE__)
        });
    }
}
 
