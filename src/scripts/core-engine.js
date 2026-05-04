'use strict';

/**
 * ENGINE PORTFOLIO V1.0
 * Tự động quản lý Route và Data Local
 */
const App = {
    // 1. Khởi tạo DB nội bộ
    db: {
        plugins: [],
        resources: [],
        youtube: []
    },

    // 2. Cấu hình Route
    routes: {
        'home': () => `<h1>Chào mừng tới Portfolio chuẩn Quốc tế</h1><p>Hệ thống tự xây dựng, không API ngoài.</p>`,
        'plugins': () => App.renderList('plugins'),
        'resources': () => App.renderList('resources'),
        'youtube': () => `<h1>Kênh Youtube</h1><div id="video-grid">Đang tải...</div>`
    },

    async init() {
        console.log("System initializing...");
        try {
            // Kiểm soát lỗi ngầm bằng try-catch toàn cục cho init
            await this.loadDatabase();
            this.handleRouting();
            window.addEventListener('hashchange', () => this.handleRouting());
            document.getElementById('current-year').textContent = new Date().getFullYear();
        } catch (error) {
            console.error("Critical System Error:", error);
            document.getElementById('app-root').innerHTML = "<h1>Hệ thống đang bảo trì. Vui lòng quay lại sau.</h1>";
        }
    },

    // 3. Cơ chế load DB Local (Chống lỗi File không tồn tại)
    async loadDatabase() {
        const datasets = ['plugins', 'resources', 'youtube'];
        for (const key of datasets) {
            const response = await fetch(`./src/data/${key}.json`);
            if (!response.ok) throw new Error(`Lỗi tải DB: ${key}`);
            this.db[key] = await response.json();
        }
    },

    // 4. SPA Router thuần
    handleRouting() {
        const hash = window.location.hash.replace('#', '') || 'home';
        const renderFunc = this.routes[hash] || this.routes['home'];
        
        const container = document.getElementById('view-content');
        container.style.opacity = 0; // Hiệu ứng chuyển trang mượt
        
        setTimeout(() => {
            container.innerHTML = renderFunc();
            container.style.opacity = 1;
        }, 150);
    },

    // 5. Render Data an toàn (Chống XSS)
    renderList(key) {
        const data = this.db[key];
        if (!data) return '<p>Không có dữ liệu.</p>';
        
        return `
            <div class="data-grid">
                ${data.map(item => `
                    <div class="card">
                        <h3>${this.escapeHTML(item.name)}</h3>
                        <p>${this.escapeHTML(item.description)}</p>
                        <span class="badge">V${item.version}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // 6. Logic Render Video Youtube (Lazy Load + Sandbox)
    renderYoutube() {
        const data = this.db.youtube;
        return `
            <h1>Kênh Youtube</h1>
            <div class="data-grid">
                ${data.map(video => `
                    <div class="card">
                        <div class="video-container">
                            <iframe 
                                src="https://youtube.com{video.embed_id}" 
                                sandbox="allow-scripts allow-same-origin"
                                loading="lazy"
                                frameborder="0" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <h3>${this.escapeHTML(video.title)}</h3>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // 7. Logic Download Bảo mật (Kiểm tra nguồn gốc)
    renderDownload() {
        const data = this.db.resources;
        return `
            <h1>Kho Download</h1>
            <div class="data-grid">
                ${data.map(item => `
                    <div class="card">
                        <h3>${this.escapeHTML(item.name)}</h3>
                        <p>Dung lượng: ${item.size}</p>
                        <button onclick="App.secureDownload('${item.url}')" class="btn-download">Tải về an toàn</button>
                    </div>
                `).join('')}
            </div>
        `;
    },

    secureDownload(url) {
        // Chặn download nếu URL không bắt đầu từ thư mục nội bộ
        if(!url.startsWith('./')) {
            alert("Cảnh báo: Liên kết tải xuống không an toàn!");
            return;
        }
        window.location.href = url;
    }

    // Hàm bảo mật: Chống XSS khi render từ JSON
    escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }
};

// Khởi chạy hệ thống
Object.freeze(App); // Đóng băng Object để không bị script ngoài can thiệp
App.init();
