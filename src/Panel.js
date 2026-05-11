export class Panel {
    constructor() {
        this.overlay = document.getElementById('panel-viewer');
        this.body = document.getElementById('panel-data-body');
        this.closeBtn = this.overlay.querySelector('.close-btn');
        
        this.closeBtn.onclick = () => this.hide();
    }

    async show(path) {
        this.body.innerHTML = '<div class="loader">Loading...</div>';
        this.overlay.classList.remove('hidden');
        this.overlay.classList.add('active');

        try {
            const response = await fetch(path);
            const data = await response.json();
            
            // Xử lý Dynamic Template dựa trên cấu trúc JSON trả về
            this.body.innerHTML = `
                <div class="detail-header">
                    <h2>${data.projectName || 'Detail View'}</h2>
                    <span class="status-tag">${data.status || 'Active'}</span>
                </div>
                <div class="detail-content">
                    ${data.description || ''}
                    <ul class="spec-list">
                        ${(data.specs || []).map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            `;
        } catch (err) {
            this.body.innerHTML = `<p>Error loading data from: ${path}</p>`;
        }
    }

    hide() {
        this.overlay.classList.remove('active');
        setTimeout(() => this.overlay.classList.add('hidden'), 400);
    }
}
 
