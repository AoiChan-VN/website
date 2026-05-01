import { siteData } from '../data/database.js';

export const Header = () => {
    const current = window.location.pathname.split("/").pop() || 'index.html';
    const nav = [
        { n: 'Trang Chủ', h: 'index.html' },
        { n: 'Plugins', h: 'plugins.html' },
        { n: 'Tài Nguyên', h: 'resources.html' },
        { n: 'Youtube', h: 'youtube.html' },
        { n: 'Tải Về', h: 'download.html' }
    ];

    return `
    <header class="navbar">
        <div class="logo">
            <img src="${siteData.settings.logo}" class="logo-img" onerror="this.src='https://placehold.co'">
            <span>🌊𝓐𝓸𝓲𝓒𝓱𝓪𝓷◡</span>
        </div>
        <nav>
            ${nav.map(item => `<a href="${item.h}" class="${current === item.h ? 'active' : ''}">${item.n}</a>`).join('')}
            <button onclick="window.openSettings()" class="btn-settings">⚙️</button>
        </nav>
    </header>
    <div id="settings-modal" class="modal-overlay" style="display:none;">
        <div class="card settings-content">
            <h3>︵»|Cài đặt|«︵</h3>
            <div class="setting-item">
                <span>Giao diện</span>
                <button onclick="window.toggleTheme()" class="btn-theme-toggle">👻</button>
            </div>
            <div class="setting-item">
                <span>Ngôn ngữ</span>
                <select class="lang-select"><option>Tiếng Việt</option><option>English</option></select>
            </div>
            <hr style="opacity:0.1; margin: 15px 0;">
            <button onclick="window.closeSettings()" class="btn-primary" style="background:#ff4444;">✘ Thoát</button>
        </div>
    </div>`;
};
