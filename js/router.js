import { Header, SettingsPanel } from './components/Layout.js';
import { siteData } from './data/database.js';
import './main.js';

const routes = {
    home: () => `
        <div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Admin Dashboard</h2></div>
        <section class="admin-panel-v4" style="padding: 20px 10%;">
            <div class="card ptero-card" style="background:#0d1117; border:1px solid var(--primary); overflow:hidden;">
                <div style="padding:15px 20px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
                    <span style="font-size:0.7rem; font-weight:800; color:#8b949e;">RESOURCE MONITOR</span>
                    <div style="color:#22c55e; font-size:0.7rem; animation:blink 1s infinite;">● LIVE</div>
                </div>
                <div id="chart-wrapper" style="height:220px; padding:20px;"></div>
                <div style="display:grid; grid-template-columns:repeat(3,1fr); background:rgba(0,0,0,0.3); border-top:1px solid rgba(255,255,255,0.05);">
                    <div style="padding:20px; text-align:center;"><span>Plugins</span><br><b style="font-size:1.5rem; color:var(--primary);">${siteData.plugins.length}</b></div>
                    <div style="padding:20px; text-align:center;"><span>Resource</span><br><b style="font-size:1.5rem; color:var(--primary);">${siteData.resources.length}</b></div>
                    <div style="padding:20px; text-align:center;"><span>Total Asset</span><br><b style="font-size:1.5rem; color:var(--primary);">${siteData.plugins.length + siteData.resources.length}</b></div>
                </div>
            </div>
        </section>`,
    plugins: () => `<div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Plugins</h2></div><div class="grid-container">${siteData.plugins.map(i => `<div class="card"><div class="card-img-wrapper"><img src="${i.img}"></div><div class="card-body"><h3>${i.name}</h3><button onclick="window.viewDetail('${i.mdPath}')" class="btn-primary">Chi Tiết</button></div></div>`).join('')}</div>`,
    resources: () => `<div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Resources</h2></div><div class="grid-container">${siteData.resources.map(i => `<div class="card"><div class="card-img-wrapper"><img src="${i.img}"></div><div class="card-body"><h3>${i.name}</h3><button onclick="window.viewDetail('${i.mdPath}')" class="btn-primary">Chi Tiết</button></div></div>`).join('')}</div>`,
    youtube: () => `<div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Media</h2></div><div class="grid-container">${siteData.youtube.map(v => `<div class="card"><iframe width="100%" height="200" src="https://youtube.com{v.videoId}" frameborder="0" allowfullscreen></iframe><div class="card-body"><h3>${v.title}</h3><a href="${siteData.settings.youtubeChannel}" target="_blank" class="btn-primary" style="display:block;text-align:center;text-decoration:none;">Xem Kênh</a></div></div>`).join('')}</div>`,
    download: () => `<div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Tải Về</h2></div><div style="padding: 0 10%;">${siteData.downloads.map(d => `<div class="card" style="display:flex;justify-content:space-between;padding:20px;margin-bottom:10px;"><span>${d.name}</span><a href="${d.link}" class="btn-primary" style="width:auto;padding:5px 20px;text-decoration:none;">Download</a></div>`).join('')}</div>`
};

async function render() {
    const hash = window.location.hash.replace("#", "") || "home";
    const layout = document.getElementById('layout-root');
    const content = document.getElementById('page-content');

    layout.innerHTML = Header() + SettingsPanel();
    content.innerHTML = routes[hash] ? routes[hash]() : routes.home();

    if (hash === "home") {
        const wrapper = document.getElementById('chart-wrapper');
        try {
            const res = await fetch('./assets/vectors/admin-chart.svg');
            wrapper.innerHTML = await res.text();
            const line = document.getElementById('svg-line');
            if (line) line.setAttribute('d', `M0,150 L133,${150 - siteData.plugins.length*20} L266,${150 - siteData.resources.length*20} L400,100`);
        } catch (e) { console.error("SVG Fail"); }
    }
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
