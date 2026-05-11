/**
 * SecurityManager: Proxy bảo vệ các System APIs nhạy cảm.
 * Ngăn chặn module bên ngoài truy cập trực tiếp vào Kernel/Registry nếu không được phép.
 */
export class SecurityManager {
    static #authorizedOrigins = ['https://aoios.org', 'http://localhost'];

    static validateOrigin(url) {
        const origin = new URL(url).origin;
        return this.#authorizedOrigins.includes(origin);
    }

    static createSandbox(componentInstance) {
        // Trả về một proxy giới hạn quyền truy cập global/window của component
        return new Proxy(componentInstance, {
            get(target, prop) {
                if (prop === 'kernel') return undefined; // Giấu Kernel
                return target[prop];
            }
        });
    }
}
 
