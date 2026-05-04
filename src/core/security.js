export const initSecurity = () => {
    // 1. Chặn chuột phải (Hạn chế copy nhanh)
    document.addEventListener('contextmenu', event => event.preventDefault());

    // 2. Chặn các phím tắt Inspect Element (F12, Ctrl+Shift+I, v.v.)
    document.addEventListener('keydown', e => {
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || 
            (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
    });

    // 3. Giám sát DOM (Nếu ai đó cố tình xóa Footer hoặc chèn Script lạ vào App)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.removedNodes.length > 0) {
                console.warn("Cảnh báo: Phát hiện can thiệp vào cấu trúc hệ thống!");
                // Có thể thêm logic reload trang ở đây nếu cần
            }
        });
    });

    observer.observe(document.getElementById('app'), { childList: true, subtree: true });
};
 
