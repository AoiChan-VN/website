import { Header } from '../../src/components/header.js';
import { Footer } from '../../src/components/footer.js';
import { PLUGIN_DATA } from '../../src/db/pl-db.js';

const Core = {
    init() {
        this.mount();
        this.applySettings();
        console.log("AoiChan Framework v1.0 Initialized");
    },

    // Lắp ghép các thành phần vào DOM
    mount() {
        document.getElementById('header-root').innerHTML = Header.render();
        document.getElementById('footer-root').innerHTML = Footer.render();
        this.renderHero();
        this.renderSettings();
    },

    renderHero() {
        document.getElementById('hero-root').innerHTML = `
        <section class="hero">
            <div class="hero-bg-glow"></div>
            <div class="container text-center">
                <h1 class="fade-in">AoiChan Project</h1>
                <p class="fade-in-2">Premium Minecraft Solutions & Resources.</p>
                <div class="hero-btns fade-in-3">
                    <button onclick="Core.openPanel('plugins')" class="btn-primary">Plugins</button>
                    <button onclick="Core.openPanel('resource')" class="btn-secondary">Resources</button>
                </div>
            </div>
        </section>`;
    },

    renderSettings() {
        document.getElementById('settings-root').innerHTML = `
        <div id="settings-panel" class="settings-overlay" onclick="Core.toggleSettings(event)">
            <div class="settings-card" onclick="event.stopPropagation()">
                <div class="settings-header"><h3>Settings</h3><span class="close-btn" onclick="Core.toggleSettings()">×</span></div>
                <div class="settings-body">
                    <div class="s-item"><span>Theme</span><select id="t-sel" onchange="Core.setTheme(this.value)"><option value="dark">Dark</option><option value="light">Light</option></select></div>
                </div>
            </div>
        </div>`;
    },

    // SPA Logic
    openPanel(type) {
        const p = document.getElementById('app-panel');
        const c = document.getElementById('panel-content');
        document.getElementById('panel-nav-root').innerHTML = `
            <div class="panel-nav"><div class="container flex-between"><h2>${type.toUpperCase()}</h2><div class="close-circle" onclick="Core.closePanel()">×</div></div></div>`;
        
        let data = (type === 'plugins') ? PLUGIN_DATA : [];
        c.innerHTML = data.map(item => `
            <div class="card fade-in">
                <span class="tag">${item.tag}</span>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="card-footer"><small>${item.version}</small><button class="btn-get">DOWNLOAD</button></div>
            </div>`).join('');
            
        p.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closePanel() {
        document.getElementById('app-panel').classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    toggleSettings() { document.getElementById('settings-panel').classList.toggle('active'); },

    setTheme(v) { document.body.setAttribute('data-theme', v); localStorage.setItem('theme', v); },

    applySettings() {
        const t = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', t);
    }
};

window.Core = Core;
window.onload = () => Core.init();
