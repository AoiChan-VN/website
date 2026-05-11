export class Panel {
    constructor() {
        this.overlay = document.getElementById('panel-viewer');
        this.body = document.getElementById('panel-data-body');
        
        // Listener cho nút đóng
        this.overlay.querySelector('.close-btn').onclick = () => this.close();
        
        // Đóng khi click ra ngoài vùng chứa nội dung
        this.overlay.onclick = (e) => {
            if (e.target === this.overlay) this.close();
        };
    }

    async open(path) {
        // 1. Hiển thị ngay overlay với hiệu ứng blur để tạo cảm giác phản hồi nhanh
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Chặn scroll trang chính
        this.body.innerHTML = `<div class="shimmer-loader"></div>`; 
        
        try {
            const res = await fetch(path);
        
            // Kiểm tra nếu fetch không thành công (404)
            if (!res.ok) throw new Error(`Server returned status ${res.status}`);
          
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                console.error("Nhận được HTML thay vì JSON:", text.substring(0, 100));
                throw new Error("Tệp không tồn tại hoặc sai định dạng JSON.");
            }
            
            const data = await res.json();
            // ... render data ...
        } catch (err) {
            this.body.innerHTML = `<p class="error">System Leak: ${err.message}</p>`;
        }
    }
            // 3. Render template chuyên sâu (High-End Visualization)
            this.body.innerHTML = `
                <div class="panel-header">
                    <span class="tag">DEEP DATA SCAN</span>
                    <h2>${data.projectName}</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-item"><h4>CPU</h4><p>${data.metrics.cpu}</p></div>
                    <div class="stat-item"><h4>RAM</h4><p>${data.metrics.ram}</p></div>
                </div>
                <div class="log-viewer">
                    ${data.logs.map(log => `<div class="log-line">> ${log}</div>`).join('')}
                </div>
            `;
        } catch (err) {
            this.body.innerHTML = `<p class="error">Data linkage failed: ${err.message}</p>`;
        }
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Xóa sạch nội dung sau khi đóng để giải phóng RAM
        setTimeout(() => { this.body.innerHTML = ''; }, 400);
    }
}
