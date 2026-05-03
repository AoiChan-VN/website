import { siteData } from '../data/database.js';

export const Header = () => {
    const current = window.location.pathname.split("/").pop() || 'index.html';
    const nav = [
        { n: '𝓗𝓸𝓶𝓮', h: 'index.html' },
        { n: '𝓟𝓵𝓾𝓰𝓲𝓷𝓼', h: 'plugins.html' },
        { n: '𝓡𝓮𝓻𝓸𝓾𝓼𝓬𝓮𝓻', h: 'resources.html' },
        { n: '𝓨𝓸𝓾𝓽𝓾𝓫𝓮', h: 'youtube.html' },
        { n: '𝓓𝓸𝔀𝓷𝓵𝓸𝓪𝓭', h: 'download.html' }
    ];

    return `
    <header class="navbar">
        <!-- Ảnh Logo (trái) -->
        <div class="logo">
            <img src="${siteData.settings.logo}" class="logo-img" onerror="this.src='https://placehold.co'">
            <span class="brand-name">🌊◞𝓐𝓸𝓲𝓒𝓱𝓪𝓷◡</span>
        </div>

        <!-- Khối Menu & Settings (phải) -->
        <div class="nav-container">
            <nav>
                ${nav.map(item => `<a href="${item.h}" class="${current === item.h ? 'active' : ''}">${item.n}</a>`).join('')}
            </nav>
            <button onclick="window.openSettings()" class="btn-settings" title="Cài đặt">⚙️</button>
        </div>
    </header>

    <div id="settings-modal" class="modal-overlay" style="display:none;">
        <div class="card settings-content">
            <h3 style="color:var(--primary); margin-bottom:20px;">︵»|Cài đặt|«︵</h3>
            <p> © 2026 AoiChan | All rights reserved </p>
            <div class="setting-item">
                <span>Giao diện</span>
                <button onclick="window.toggleTheme()" class="btn-theme-toggle">👻</button>
            </div>
            <div class="setting-item">
                <span>Ngôn ngữ</span>
                <select class="lang-select">
                    <option>Tiếng Việt</option>
                    <option>English</option>
                </select>
            </div>
            <hr style="opacity:0.1; margin: 20px 0;">
            <button onclick="window.closeSettings()"
            class="btn-primary" style="background:linear-gradient(135deg, #ff4444, #cc0000); border:none;">Thoát</button>
        </div>
    </div>`;
};
