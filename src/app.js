import { initSecurity } from './core/security.js';
import { pluginsDB } from './data/plugins.js';
import { youtubeDB } from './data/youtube.js';
import { resourcesDB } from './data/resources.js';
import { sanitize } from './utils/sanitizer.js';

const mainContent = document.getElementById('main-content');

document.addEventListener('DOMContentLoaded', () => {
    initSecurity();
});

// 1. Router: Định nghĩa các tuyến đường
const routes = {
    '/': { title: 'Trang chủ', render: renderHome },
    '/plugins': { title: 'Plugins Chuyên Nghiệp', render: renderPlugins },
    '/resources': { title: 'Resource Packs', render: renderResources },
    '/youtube': { title: 'Kênh Youtube', render: renderYoutube },
    '/download': { title: 'Trung tâm Tải về', render: renderDownload }
};

// 2. Render Engine: Xử lý hiển thị (Dùng Template String tối ưu)
function renderHome() {
    mainContent.innerHTML = `
        <section class="hero fade-in">
            <h1>Chào mừng tới Portfolio chuẩn Quốc tế</h1>
            <p>Full Stack Developer - Chuyên gia tối ưu hệ thống.</p>
        </section>
    `;
}

function renderPlugins() {
    const html = pluginsDB.map(item => `
        <div class="card">
            <h3>${sanitize(item.title)}</h3>
            <span class="badge">${item.version}</span>
            <p>${sanitize(item.desc)}</p>
            <a href="/download" data-link class="btn-sm">Chi tiết</a>
        </div>
    `).join('');
    
    mainContent.innerHTML = `<section class="grid-container fade-in">${html}</section>`;
}

function renderYoutube() {
    const html = youtubeDB.map(item => `
        <div class="video-card">
            <img src="${item.thumbnail}" alt="${sanitize(item.title)}">
            <h4>${sanitize(item.title)}</h4>
            <a href="https://youtube.com{item.embedId}" target="_blank" rel="noopener noreferrer">Xem ngay</a>
        </div>
    `).join('');
    mainContent.innerHTML = `<section class="grid-container fade-in">${html}</section>`;
}

// 3. Logic điều hướng không load lại trang (SPA Core)
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/']; // Default về Home nếu không tìm thấy
    
    document.title = `${route.title} | Senior Portfolio`;
    route.render();
};

// 4. Khởi tạo Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Chặn load trang khi click vào link có data-link
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    // Xử lý nút Back/Forward của trình duyệt
    window.addEventListener('popstate', router);

    router(); // Chạy lần đầu khi load web
});
 
