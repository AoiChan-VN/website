import { Header, SettingsPanel } from './components/Layout.js';
import { siteData } from './data/database.js';
import './main.js';

// --- ĐỊNH NGHĨA CÁC TRANG (GIAO DIỆN) ---
const routes = {
    'home': () => `
        <div class="page-header" style="padding: 0 10% 40px 10%;">
            <h2 class="section-title">🌊𝓐𝓸𝓲𝓒𝓱𝓪𝓷 𝓟𝓸𝓻𝓽𝓯𝓸𝓵𝓲𝓸</h2>
            <p>| Hệ thống lưu trữ tài nguyên nội bộ thời gian thực.</p>
        </div>
        <!-- Copy toàn bộ cấu trúc Dashboard anh đã làm vào đây -->
        <section class="admin-panel-v4" style="padding: 0 10%;">
             <div class="card ptero-card main-admin-box">
                <div class="ptero-card-header">
                    <span class="ptero-title">SYSTEM MONITOR</span>
                    <div class="live-indicator">● LIVE</div>
                </div>
                <div class="ptero-card-body" id="chart-wrapper" style="height: 220px;"></div>
                <div class="admin-stats-footer">
                    <div class="footer-item"><span>Plugins</span><strong>${siteData.plugins.length}</strong></div>
                    <div class="footer-item"><span>Resources</span><strong>${siteData.resources.length}</strong></div>
                    <div class="footer-item"><span>Total</span><strong>${siteData.plugins.length + siteData.resources.length}</strong></div>
                </div>
            </div>
        </section>
    `,

    'plugins': () => `
        <div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Plugins</h2></div>
        <div class="grid-container">
            ${siteData.plugins.map(item => `
                <div class="card">
                    <div class="card-img-wrapper"><img src="${item.img}"></div>
                    <div class="card-body">
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                        <button onclick="window.viewDetail('${item.mdPath}')" class="btn-primary">Chi Tiết</button>
                    </div>
                </div>`).join('')}
        </div>
    `,

    'resources': () => `
        <div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Tài Nguyên</h2></div>
        <div class="grid-container">
            ${siteData.resources.map(item => `
                <div class="card">
                    <div class="card-img-wrapper"><img src="${item.img}"></div>
                    <div class="card-body">
                        <h3>${item.name}</h3>
                        <p>Dung lượng: ${item.size}</p>
                        <button onclick="window.viewDetail('${item.mdPath}')" class="btn-primary">Tải về</button>
                    </div>
                </div>`).join('')}
        </div>
    `,

    'youtube': () => `
        <div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Youtube Media</h2></div>
        <div class="grid-container">
            ${siteData.youtube.map(vid => `
                <div class="card">
                    <div class="card-img-wrapper">
                         <img src="${vid.gifThumb || './assets/vectors/chart.svg'}">
                    </div>
                    <div class="card-body">
                        <h3>${vid.title}</h3>
                        <a href="${siteData.settings.youtubeChannel}" target="_blank" class="btn-primary" style="display:block;text-align:center;text-decoration:none;">Xem Kênh</a>
                    </div>
                </div>`).join('')}
        </div>
    `,

    'download': () => `
        <div class="page-header" style="padding: 0 10%;"><h2 class="section-title">Tải Về</h2></div>
        <div style="padding: 0 10%;">
            <div class="card" style="padding: 20px;">
                ${siteData.downloads.map(f => `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid var(--border);">
                        <span>${f.name}</span>
                        <a href="${f.link}" class="btn-primary" style="width:auto; padding:5px 20px; text-decoration:none;">Download</a>
                    </div>`).join('')}
            </div>
        </div>
    `
};

// --- HÀM ĐIỀU HƯỚNG ---
async function handleLocation() {
    const path = window.location.hash.replace("#", "") || "home";
    const renderFunc = routes[path] || routes['home'];
    
    // Luôn render Header và Settings
    document.getElementById('layout-root').innerHTML = Header() + SettingsPanel();
    
    // Đổ nội dung trang tương ứng
    document.getElementById('page-content').innerHTML = renderFunc();

    // Nếu quay về trang chủ, kích hoạt lại biểu đồ SVG
    if (path === "home") {
        const wrapper = document.getElementById('chart-wrapper');
        const response = await fetch('./assets/vectors/admin-chart.svg');
        wrapper.innerHTML = await response.text();
        // Có thể gọi thêm logic update SVG theo số liệu thật ở đây
    }
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", handleLocation);
 
