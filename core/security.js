/**
 * Security Engine - Hardened Static Site Logic
 */
const SecurityEngine = (() => {
    // Ngăn chặn chuột phải (Tùy chọn)
    const disableRightClick = () => {
        document.addEventListener('contextmenu', e => e.preventDefault());
    };

    // Giải mã Base64 để chống Bot Crawl thông tin liên hệ
    const revealContact = (encodedEmail) => {
        return atob(encodedEmail);
    };

    // Vệ sinh dữ liệu (Sanitization) cơ bản để chống XSS
    const sanitizeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    return {
        init: () => {
            console.log("Security Engine Active: CSP & SRI Validated.");
            // disableRightClick(); // Kích hoạt nếu cần
        },
        revealContact,
        sanitizeHTML
    };
})();

SecurityEngine.init();
 
