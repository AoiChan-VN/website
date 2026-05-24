export class ModalComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(data) {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="modal-content">
                <button class="close-modal" id="close-modal-btn">✕</button>
                <h2>${data.name}</h2>
                <br>
                <p><strong>ID Sản phẩm:</strong> ${data.id}</p>
                <p><strong>Định dạng File cấu hình:</strong> ${data.file}</p>
                <p><strong>Nguồn phát hành:</strong> ${data.link}</p>
            </div>
        `;
        
        this.container.classList.add('active');
        
        document.getElementById('close-modal-btn').addEventListener('click', () => this.close());
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) this.close();
        });
    }

    close() {
        this.container.classList.remove('active');
        this.container.innerHTML = '';
    }
}
