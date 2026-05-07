import { PLUGIN_DATA } from '../../src/db/pl-db.js';
// Bạn có thể import tương tự cho các db khác

const Core = {
    init() {
        this.cacheDOM();
        this.bindEvents();
        console.log("AoiChan System Initialized...");
    },

    cacheDOM() {
        this.panel = document.getElementById('app-panel');
        this.content = document.getElementById('panel-content');
        this.title = document.getElementById('panel-title');
    },

    bindEvents() {
        // Lắng nghe phím ESC để đóng panel
        window.addEventListener('keydown', (e) => {
            if(e.key === "Escape") this.closePanel();
        });
    },

    openPanel(type) {
        this.panel.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderData(type);
    },

    closePanel() {
        this.panel.classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    renderData(type) {
        let html = '';
        if(type === 'plugins') {
            this.title.innerText = "PLUGINS RESOURCE";
            html = PLUGIN_DATA.map(item => `
                <div class="card">
                    <span class="tag">${item.tag}</span>
                    <h3 style="margin: 15px 0 10px 0">${item.name}</h3>
                    <p style="color: var(--text-dim); font-size: 14px; margin-bottom: 20px">${item.description}</p>
                    <div class="flex-between">
                        <small style="color: var(--primary)">${item.version}</small>
                        <a href="${item.link}" target="_blank" class="btn-sub" style="padding: 5px 15px; font-size: 12px; text-decoration: none;">Download</a>
                    </div>
                </div>
            `).join('');
        } else {
            this.title.innerText = "OTHER CONTENT";
            html = `<p style="text-align:center; width:100%">Dữ liệu đang được cập nhật...</p>`;
        }
        this.content.innerHTML = html;
    }
};

// Đưa Core ra Global để dùng trong HTML onclick
window.Core = Core;
Core.init();
