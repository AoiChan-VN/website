/**
 * AoiChan UI Logic: Mobile Menu Handler
 * Xử lý đóng/mở menu mượt mà và tối ưu hiệu năng.
 */
export const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!menuToggle || !navLinks) return;

    // 1. Toggle Menu
    const toggleMenu = () => {
        const isOpen = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Chống cuộn trang khi menu đang mở (UX chuẩn)
        body.style.overflow = isOpen ? 'hidden' : '';
        
        // Cập nhật thuộc tính ARIA cho người khiếm thị (Accessibility)
        menuToggle.setAttribute('aria-expanded', isOpen);
    };

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // 2. Đóng menu khi click vào một link (Vì đây là SPA)
    navLinks.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        }
    });

    // 3. Đóng menu khi click ra ngoài vùng menu
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });
};
 
