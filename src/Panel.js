export class Panel {
    constructor() {
        this.overlay = document.getElementById('panel-viewer');
        this.body = document.getElementById('panel-data-body');
        this.overlay.querySelector('.close-btn').onclick = () => this.close();
    }

    async open(path) {
        this.overlay.classList.add('active');
        this.body.innerHTML = '<div class="loader">SYNCING DATA...</div>';

        try {
            const res = await fetch(path);
            
            // Nếu server trả về trang 404 (HTML), dừng ngay lập tức
            if (!res.ok) throw new Error(`HTTP ${res.status} - Không tìm thấy file tại: ${path}`);
            
            const data = await res.json();
            
            // Render logic...
            this.body.innerHTML = `<h2>${data.projectName || 'Success'}</h2><p>${data.description || 'Data loaded.'}</p>`;
            
        } catch (err) {
            console.error("Critical Fail:", err);
            this.body.innerHTML = `
                <div class="error-box">
                    <h3>HỆ THỐNG LỖI</h3>
                    <p>Lý do: File JSON tại <code>${path}</code> không tồn tại hoặc sai cấu trúc.</p>
                    <small>Kiểm tra kỹ tên file (hoa/thường) trên GitHub.</small>
                </div>
            `;
        }
    }

    close() {
        this.overlay.classList.remove('active');
    }
}
