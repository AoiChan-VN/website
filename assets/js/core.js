import { Sidebar } from '../../src/components/sidebar.js';
import { Header } from '../../src/components/header.js';
import { PLUGIN_DATA } from '../../src/db/pl-db.js';

const Core = {
    init() {
        this.mount();
        this.navigate('home');
        console.log("AoiChan OS v2.0 Initialized");
    },

    mount() {
        document.getElementById('sidebar-root').innerHTML = Sidebar.render();
    },

    navigate(page) {
        const view = document.getElementById('content-view');
        document.getElementById('header-root').innerHTML = Header.render(page.toUpperCase());
        
        let html = '';
        if (page === 'home') {
            html = `<div class="hero-min"><h1>Welcome, AoiChan</h1><p>Hệ thống quản lý tài nguyên tối ưu.</p></div>`;
        } else if (page === 'plugins') {
            html = `<div class="grid">${PLUGIN_DATA.map(i => this.cardTemplate(i)).join('')}</div>`;
        } else if (page === 'settings') {
            html = `<div class="card"><h3>System Preference</h3><br><p>Language: Tiếng Việt</p><br><button onclick="Core.toggleTheme()" class="tag">Switch Theme</button></div>`;
        }
        
        view.innerHTML = `<div class="fade-in">${html}</div>`;
    },

    cardTemplate(i) {
        return `
        <div class="card">
            <span class="tag">${i.tag}</span>
            <h3 style="margin-top:15px">${i.name}</h3>
            <p style="color:var(--text-dim); font-size:14px; margin:10px 0">${i.description}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px">
                <small>${i.version}</small>
                <button class="tag" style="cursor:pointer">GET</button>
            </div>
        </div>`;
    },

    toggleTheme() {
        const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', theme);
    }
};

window.Core = Core;
Core.init();
