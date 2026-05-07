import { Navigation } from '../../src/components/sidebar.js';
import { PLUGIN_DATA } from '../../src/db/pl-db.js';

const Core = {
    init() {
        this.mountBaseLayout();
        this.router('home');
        this.ui.loadTheme();
    },

    // Đổ dữ liệu tĩnh ban đầu
    mountBaseLayout() {
        document.getElementById('header-root').innerHTML = `
            <header class="main-header">
                <div class="container flex-between">
                    <button onclick="Core.ui.toggleSidebar()" class="btn-nav">☰</button>
                    <div class="logo">AOICHAN</div>
                    <button onclick="Core.ui.toggleSettings()" class="btn-nav">⚙️</button>
                </div>
            </header>`;
        document.getElementById('sidebar-root').innerHTML = Navigation.renderSidebar();
        document.getElementById('settings-root').innerHTML = Navigation.renderSettings();
    },

    // Điều hướng không load lại trang (SPA)
    router(path) {
        const view = document.getElementById('app-viewport');
        this.ui.toggleSidebar(false); // Đóng menu khi chuyển trang

        let html = "";
        switch(path) {
            case 'home':
                html = `<div class="hero-card"><h1>Welcome AoiChan</h1><p>Hệ thống Portfolio chuẩn Senior 2026.</p></div>`;
                break;
            case 'plugins':
                html = `<div class="grid">` + PLUGIN_DATA.map(item => `
                    <div class="card">
                        <span class="tag">${item.tag}</span>
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <button class="btn-get">Tải ngay</button>
                    </div>`).join('') + `</div>`;
                break;
        }
        view.innerHTML = `<div class="fade-in">${html}</div>`;
    },

    // Logic giao diện
    ui: {
        toggleSidebar(state) {
            const el = document.getElementById('sidebar-drawer');
            const ov = document.getElementById('overlay');
            el.classList.toggle('active', state);
            ov.classList.toggle('active', state);
        },
        toggleSettings() {
            document.getElementById('settings-modal').classList.toggle('active');
        },
        toggleTheme() {
            const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('aoi-theme', theme);
        },
        loadTheme() {
            const saved = localStorage.getItem('aoi-theme') || 'dark';
            document.body.setAttribute('data-theme', saved);
        }
    }
};

window.Core = Core;
window.onload = () => Core.init();
