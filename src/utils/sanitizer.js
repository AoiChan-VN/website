/**
 * Security Tool: Chống XSS (Cross-Site Scripting)
 * Đảm bảo mọi dữ liệu hiển thị đều an toàn tuyệt đối.
 */
export const sanitize = (string) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
};
 
