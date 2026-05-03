import { Header, SettingsPanel } from './components/Layout.js';
import { siteData } from './data/database.js';
import './main.js'; // Kích hoạt bảo mật và theme từ file anh vừa gửi

const pageContent = document.getElementById('page-content');
const layoutRoot = document.getElementById('layout-root');

// --- HÀM RENDER CHI TIẾT ---
const routes = {
    home: () => `
        <div class="page-header" style="padding: 0 10% 20px 10%;">
            <h2 class="section-title">🌊𝓐𝓸𝓲𝓒𝓱𝓪𝓷 𝓟𝓸𝓻𝓽𝓯𝓸𝓵𝓲𝓸</h2>
            <p>| Hệ thống quản trị nội bộ v5.0</p>
        </div>
        <section class="admin-panel-v4" style="padding: 0 10%;">
            <div class="card ptero-card main-admin-box">
                <div class="ptero-card-header">
                    <span class="ptero-title">SYSTEM ANALYTICS</span>
                    <div class="live-indicator">● LIVE DATA</div>
                </div>
                <div class="ptero-card-body" id="chart-wrapper" style="height: 220px;"></div>
                <div class="admin-stats-footer">
                    <div class="footer-item"><span>Plugins</span><strong>${siteData.plugins.length}</strong></div>
                    <div class="footer-item"><span>Resources</span><strong>${siteData.resources.length}</strong></div>
                    <div class="footer-item"><span>Total Asset</span><strong>${siteData.plugins.length + siteData.resources.length}</strong></div>
                </div>
            </div>
        </section>`,

    plugins: () => `
        <div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Plugins</h2></div>
        <div class="grid-container">
            ${siteData.plugins.map(item => `
                <div class="card">
                    <div class="card-img-wrapper"><img src="${item.img}" onerror="this.src='https://placehold.co'"></div>
                    <div class="card-body">
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                        <button onclick="window.viewDetail('${item.mdPath}')" class="btn-primary">Xem Chi Tiết</button>
                    </div>
                </div>`).join('')}
        </div>`,

    youtube: () => `
        <div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Youtube Media</h2></div>
        <div class="grid-container">
            ${siteData.youtube.map(vid => `
                <div class="card">
                    <div class="card-img-wrapper"><img src="${vid.gifThumb || 'https://placehold.co'}"></div>
                    <div class="card-body">
                        <h3>${vid.title}</h3>
                        <a href="${siteData.settings.youtubeChannel}" target="_blank" class="btn-primary" style="display:block;text-align:center;text-decoration:none;">Xem Kênh</a>
                    </div>
                </div>`).join('')}
        </div>`,

    download: () => `
        <div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Tải Về</h2></div>
        <div style="padding: 0 10%;">
            <div class="card" style="padding: 20px;">
                ${siteData.downloads.map(f => `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid var(--border);">
                        <span>${f.name} (<b>${f.size}</b>)</span>
                        <a href="${f.link}" class="btn-primary" style="width:auto; padding:8px 25px; text-decoration:none;">Download</a>
                    </div>`).join('')}
            </div>
        </div>`
};

// --- ĐIỀU HƯỚNG ---
async function handleLocation() {
    const hash = window.location.hash.replace("#", "") || "home";
    const render = routes[hash] || routes.home;

    // Render Layout & Page Content
    layoutRoot.innerHTML = Header() + SettingsPanel();
    pageContent.innerHTML = render();

    // Hiệu ứng mờ ảo khi chuyển trang
    pageContent.style.opacity = 0;
    setTimeout(() => pageContent.style.opacity = 1, 50);

    // Kích hoạt biểu đồ nếu là trang chủ
    if (hash === "home") {
        const wrapper = document.getElementById('chart-wrapper');
        try {
            const res = await fetch('./assets/vectors/admin-chart.svg');
            if (res.ok) {
                wrapper.innerHTML = await res.text();
                // Bẻ đường vẽ theo số liệu thật
                const line = document.getElementById('svg-line');
                const area = document.getElementById('svg-area');
                if (line && area) {
                    const p = siteData.plugins.length, r = siteData.resources.length;
                    const d = `M0,150 L0,${150-p*20} L133,${150-p*20} L133,${150-r*20} L400,${150-r*20}`;
                    line.setAttribute('d', d);
                    area.setAttribute('d', d + ` L400,150 L0,150 Z`);
                }
            }
        } catch (e) { console.error("SVG Load Error"); }
    }
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("DOMContentLoaded", handleLocation);
