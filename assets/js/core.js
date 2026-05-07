// Database nạp trực tiếp để tránh lỗi fetch trên GitHub
const LANG_DB = {
    vi: { hero_title: "AoiChan Project", hero_desc: "Giải pháp Minecraft chuyên sâu.", btn_plugins: "Plugins", btn_res: "Tài nguyên", settings: "Cài đặt", theme_select: "Giao diện", lang_select: "Ngôn ngữ" },
    en: { hero_title: "AoiChan Project", hero_desc: "Advanced Minecraft Solutions.", btn_plugins: "Plugins List", btn_res: "Resources", settings: "Settings", theme_select: "Theme", lang_select: "Language" }
};

const DATA_PL = [
    { id: "pl1", name: "AoiOptimizer", tag: "Premium", version: "1.2.0", desc: "Tối ưu hóa Server siêu cấp." },
    { id: "pl2", name: "AoiSync", tag: "Free", version: "2.0.1", desc: "Đồng bộ dữ liệu đa nền tảng." }
];

const Core = {
    init() {
        this.lang = localStorage.getItem('aoi_lang') || 'vi';
        this.theme = localStorage.getItem('aoi_theme') || 'dark';
        this.apply();
        console.log("System 2026 Ready.");
    },

    toggleSettings() { document.getElementById('settings-panel').classList.toggle('active'); },

    changeTheme(v) { this.theme = v; localStorage.setItem('aoi_theme', v); this.apply(); },
    
    changeLang(v) { this.lang = v; localStorage.setItem('aoi_lang', v); this.apply(); },

    apply() {
        document.body.setAttribute('data-theme', this.theme);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerText = LANG_DB[this.lang][el.dataset.i18n];
        });
        document.getElementById('theme-select').value = this.theme;
        document.getElementById('lang-select').value = this.lang;
    },

    openPanel(type) {
        const p = document.getElementById('app-panel');
        const c = document.getElementById('panel-content');
        document.getElementById('panel-title').innerText = type.toUpperCase();
        
        let html = DATA_PL.map(i => `
            <div class="card">
                <span class="tag">${i.tag}</span>
                <h3 style="margin:15px 0">${i.name}</h3>
                <p style="color:var(--text-dim);font-size:14px">${i.desc}</p>
                <div class="flex-between" style="margin-top:20px">
                    <small>${i.version}</small>
                    <button class="btn-primary" style="padding:5px 15px; font-size:12px">GET</button>
                </div>
            </div>
        `).join('');
        
        c.innerHTML = html;
        p.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closePanel() {
        document.getElementById('app-panel').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

window.Core = Core;
window.onload = () => Core.init();
