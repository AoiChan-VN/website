/**
 * @fileoverview Custom SPA Router with History API & GitHub Pages Support
 * @version 1.0.0
 * @author AoiChan
 */

import { DataEngine } from './data-engine.js';

/**
 * Danh sách routes và các hàm render tương ứng
 * @type {Object}
 */
const ROUTES = {
    '/': {
        title: 'Trang chủ | Portfolio',
        render: async () => `
            <section class="fade-in">
                <h1 class="FS-H1">Engineering <span class="text-accent">Excellence</span>.</h1>
                <p>Senior Full Stack Engineer với hơn 10 năm kinh nghiệm xây dựng hệ thống High-availability.</p>
                <div class="cta-group">
                    <a href="/plugins" class="btn" data-link>Xem Dự Án</a>
                </div>
            </section>`
    },
    '/plugins': {
        title: 'Plugins | Portfolio',
        render: async () => {
            const data = await DataEngine.fetchData('plugins');
            if (!data) return `<p class="error">Không thể tải dữ liệu plugins. Vui lòng kiểm tra console.</p>`;
            
            return `
                <section class="fade-in">
                    <h1 class="FS-H1">Specialized Plugins</h1>
                    <div class="grid-container">
                        ${data.map(item => `
                            <article class="card">
                                <div class="card-header">
                                    <span class="tag">${DataEngine.sanitizeHTML(item.version)}</span>
                                </div>
                                <h2>${DataEngine.sanitizeHTML(item.name)}</h2>
                                <p>${DataEngine.sanitizeHTML(item.description)}</p>
                                <a href="${item.link}" class="btn-link">Source Code</a>
                            </article>
                        `).join('')}
                    </div>
                </section>`;
        }
    },
    '/resource': {
        title: 'Resources | Portfolio',
        render: async () => `<section class="fade-in"><h1>Resources</h1><p>Đang cập nhật tài liệu chuyên môn...</p></section>`
    },
    '/404': {
        title: '404 - Not Found',
        render: async () => `<section class="fade-in"><h1>404</h1><p>Trang bạn tìm kiếm không tồn tại.</p><a href="/" data-link>Quay lại trang chủ</a></section>`
    }
};

/**
 * Điều hướng người dùng đến path cụ thể
 * @param {string} path 
 */
export const navigate = async (path) => {
    // 1. Cập nhật URL (History API)
    if (window.location.pathname !== path) {
        window.history.pushState({}, "", path);
    }

    // 2. Tìm route phù hợp hoặc fallback về 404
    const route = ROUTES[path] || ROUTES['/404'];
    
    // 3. Cập nhật Title & UI
    document.title = route.title;
    const appRoot = document.getElementById('app-root');
    
    // Hiệu ứng chuyển trang (Loading State)
    appRoot.style.opacity = '0.5';
    
    try {
        appRoot.innerHTML = await route.render();
    } catch (err) {
        console.error('Router Render Error:', err);
        appRoot.innerHTML = `<p class="error">Đã xảy ra lỗi khi render trang.</p>`;
    } finally {
        appRoot.style.opacity = '1';
    }
};

/**
 * Xử lý logic khởi tạo khi load trang (Bao gồm cả GitHub Pages Redirect)
 */
const initRouter = () => {
    // 1. Bắt sự kiện Click trên toàn bộ Document (Event Delegation)
    document.addEventListener('click', e => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            const path = link.getAttribute('href');
            navigate(path);
        }
    });

    // 2. Xử lý nút Back/Forward của trình duyệt
    window.addEventListener('popstate', () => {
        navigate(window.location.pathname);
    });

    // 3. Kiểm tra query string từ trang 404.html redirect sang (Nếu có)
    const urlParams = new URLSearchParams(window.location.search);
    const redirectedPath = urlParams.get('path');
    
    if (redirectedPath) {
        // Xóa query param
        window.history.replaceState({}, "", redirectedPath);
        navigate(redirectedPath);
    } else {
        // Load trang hiện tại
        navigate(window.location.pathname);
    }
};

// Khởi chạy router
initRouter();
