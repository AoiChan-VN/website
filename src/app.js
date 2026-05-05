import { pluginsDB } from './data/plugins.js';
import { youtubeDB } from './data/youtube.js';
import { resourcesDB } from './data/resources.js';
import { sanitize } from './utils/sanitizer.js';
import { initSecurity } from './core/security.js';
import { initMobileMenu } from './core/menu.js';

const mainContent = document.getElementById('main-content');

// 1. Hàm Render dứt điểm (Viết trực tiếp vào đây để tránh lỗi Import)
const renderHome = () => {
    mainContent.innerHTML = `<section class="hero fade-in"><h1>PORTFOLIO CHUẨN QUỐC TẾ</h1><p>Đã kết nối thành công.</p></section>`;
};

const renderPlugins = () => {
    const html = pluginsDB.map(item => `
        <div class="card">
            <span class="badge">${item.version}</span>
            <h3>${sanitize(item.title)}</h3>
            <p>${sanitize(item.desc)}</p>
        </div>
    `).join('');
    mainContent.innerHTML = `<section class="grid-container fade-in">${html}</section>`;
};

// 2. Router Engine (Fix lỗi so khớp chuỗi)
const routes = {
    '': renderHome,
    '#/': renderHome,
    '#/plugins': renderPlugins,
    '#/youtube': () => { mainContent.innerHTML = '<h1 class="fade-in">Youtube Channel</h1>'; },
    '#/resources': () => { mainContent.innerHTML = '<h1 class="fade-in">Resource Packs</h1>'; },
    '#/download': () => { mainContent.innerHTML = '<h1 class="fade-in">Download Center</h1>'; }
};

const handleRouting = () => {
    const hash = window.location.hash || '#/';
    console.log("Current Hash:", hash); // Kiểm tra xem Hash có nhận đúng không

    const renderFn = routes[hash];

    if (renderFn) {
        mainContent.style.opacity = 0;
        setTimeout(() => {
            renderFn();
            mainContent.style.opacity = 1;
            console.log("Render Success for:", hash);
        }, 50);
    } else {
        console.error("Route not found:", hash);
        mainContent.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
};

// 3. Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    initSecurity();
    initMobileMenu();

    // Lắng nghe thay đổi hash
    window.addEventListener('hashchange', handleRouting);
    
    // Chạy ngay lập tức
    handleRouting();
});
