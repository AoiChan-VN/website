import { DatabaseEngine } from './core/database.js';
import { PanelComponent } from './components/panel.js';
import { ModalComponent } from './components/modal.js';

class AppEngine {
    constructor() {
        this.db = new DatabaseEngine();
        this.modal = new ModalComponent('modal-container');
        this.panel = new PanelComponent('main-view', (product) => this.handleProductSelect(product));
    }

    async init() {
        // Đóng các menu con đang mở nếu bấm ra ngoài card
        document.addEventListener('click', () => {
            document.querySelectorAll('.action-menu').forEach(m => m.classList.remove('active'));
        });

        // Tự động nhận diện cây thư mục database và render
        try {
            const products = await this.db.fetchAllProducts();
            this.panel.renderGrid(products);
        } catch (error) {
            console.error("Critical Failure initializing AppEngine Matrix:", error);
        }
    }

    handleProductSelect(product) {
        this.modal.render(product);
    }
}

// Khởi chạy hệ thống Single Page Module thực thụ
const app = new AppEngine();
document.addEventListener('DOMContentLoaded', () => app.init());
 
