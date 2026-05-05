/**
 * @fileoverview Security Module - XSS Prevention & CSP Enforcement
 * @version 1.0.0
 */

export const Security = {
    /**
     * Khởi tạo các lớp bảo mật phía Client
     */
    init() {
        this.blockIframe();
        this.freezePrototypes();
        console.log("🛡️ Security Engine: Active");
    },

    /**
     * Anti-Clickjacking: Ngăn chặn trang bị nhúng vào iframe lạ
     */
    blockIframe() {
        if (window.self !== window.top) {
            window.top.location = window.self.location;
        }
    },

    /**
     * Đóng băng các Object nguyên bản để tránh Prototype Pollution
     */
    freezePrototypes() {
        Object.freeze(Object.prototype);
        Object.freeze(Array.prototype);
    },

    /**
     * Hàm Validate nội dung từ JSON DB trước khi xử lý logic nặng hơn
     * @param {Object} data 
     * @returns {boolean}
     */
    isValidPayload(data) {
        if (!data || typeof data !== 'object') return false;
        // Kiểm tra xem payload có chứa các từ khóa script độc hại không
        const payloadString = JSON.stringify(data).toLowerCase();
        return !payloadString.includes('<script') && !payloadString.includes('javascript:');
    }
};

Security.init();
 
