import { pluginsDB } from './data/plugins.js';
import { youtubeDB } from './data/youtube.js';
import { resourcesDB } from './data/resources.js';
import { sanitize } from './utils/sanitizer.js';
import { initSecurity } from './core/security.js';
import { initMobileMenu } from './core/menu.js';

const mainContent = document.getElementById('main-content');

// 1. Cấu trúc Router
const routes = {
    '#/': { title: 'Trang chủ', render: renderHome },
    '#/plugins': { title: 'Plugins Chuyên Nghiệp', render: renderPlugins },
    '#/resources': { title: 'Resource Packs', render: renderResources },
    '#/youtube': { title: 'Kênh Youtube', render: renderYoutube },
    '#/download': { title: 'Trung tâm Tải về', render: renderDownload },
    '#/404': { title: 'Không tìm thấy trang', render: render404 }
};

// 2. Các hàm Render chuyên biệt
function renderResources() {
    const html = resourcesDB.map(res => `
        <div class="card resource-card">
            <h3>${sanitize(res.name)}</h3>
            <p>Độ phân giải: <strong>${res.resolution}</strong></p>
            <p>Dung lượng: ${res.fileSize}</p>
            <a href="${res.downloadPath}" class="btn-sm" download>Tải ngay</a>
        </div>
    `).join('');
    mainContent.innerHTML = `<section class="grid-container fade-in">${html}</section>`;
}

function render404() {
    mainContent.innerHTML = `
        <section class="error-page fade-in">
            <h1>404</h1>
            <p>Yêu cầu không hợp lệ hoặc trang đã bị gỡ bỏ.</p>
            <a href="/" data-link class="btn-main">Quay lại trang chủ</a>
        </section>
    `;
}

// 3. SPA Engine - Xử lý điều hướng
const router = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/404']; // Chống bug gõ sai URL
    
    document.title = `${route.title} | Global Portfolio`;
    
    // Hiệu ứng chuyển cảnh
    mainContent.style.opacity = 0;
    setTimeout(() => {
        route.render();
        mainContent.style.opacity = 1;
    }, 150);
};

// 4. Khởi chạy hệ thống
document.addEventListener('DOMContentLoaded', () => {
    initSecurity(); // Kích hoạt bảo mật Runtime
    initMobileMenu(); // Kích hoạt Mobile Menu
    
    document.body.addEventListener('click', e => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            history.pushState(null, null, link.href);
            router();
        }
    });

    window.addEventListener('hashchange', router);
    router();
    
    window.addEventListener('popstate', router);
    router();
});
