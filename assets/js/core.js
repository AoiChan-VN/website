import { PLUGIN_DATA } from '../../src/db/pl-db.js';
import { RESOURCE_DATA } from '../../src/db/rs-db.js';
import { YOUTUBE_DATA } from '../../src/db/yt-db.js';
import { renderFooter } from '../../src/components/footer.js';

const Core = {
    init() {
        this.dom = {
            panel: document.getElementById('app-panel'),
            content: document.getElementById('panel-content'),
            title: document.getElementById('panel-title'),
            close: document.getElementById('panel-close'),
            menuBtn: document.getElementById('menu-open')
        };
        this.setupEvents();
        document.getElementById('footer-root').innerHTML = renderFooter();
    },

    setupEvents() {
        this.dom.close.onclick = () => this.closePanel();
        this.dom.menuBtn.onclick = () => this.openPanel('menu');
        
        // Đóng panel khi nhấn phím Esc
        window.onkeydown = (e) => { if(e.key === "Escape") this.closePanel(); };
    },

    openPanel(type) {
        this.dom.panel.classList.add('active');
        document.body.style.overflow = 'hidden'; // Chặn scroll trang chủ
        this.renderContent(type);
    },

    closePanel() {
        this.dom.panel.classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    renderContent(type) {
        let html = '';
        switch(type) {
            case 'plugins':
                this.dom.title.innerText = 'Minecraft Plugins';
                html = PLUGIN_DATA.map(item => this.templateCard(item)).join('');
                break;
            case 'resource':
                this.dom.title.innerText = 'Resource Packs';
                html = RESOURCE_DATA.map(item => this.templateCard(item)).join('');
                break;
            case 'menu':
                this.dom.title.innerText = 'Danh Mục';
                html = `<div class="menu-list">
                    <button onclick="Core.openPanel('plugins')">Plugins</button>
                    <button onclick="Core.openPanel('resource')">Resources</button>
                    <button onclick="Core.openPanel('youtube')">YouTube</button>
                </div>`;
                break;
        }
        this.dom.content.innerHTML = `<div class="grid">${html}</div>`;
    },

    templateCard(item) {
        return `
            <div class="card fade-in">
                <span class="tag-${item.tag}">${item.tag.toUpperCase()}</span>
                <h3>${item.name}</h3>
                <p>${item.description || item.size}</p>
                <a href="${item.link}" class="btn-card">Chi tiết</a>
            </div>
        `;
    }
};

window.Core = Core; // Global access cho onclick
Core.init();
