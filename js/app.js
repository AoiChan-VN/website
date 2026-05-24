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
        document.addEventListener('click', () => {
            document.querySelectorAll('.action-menu').forEach(m => m.classList.remove('active'));
        });

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

const app = new AppEngine();
document.addEventListener('DOMContentLoaded', () => app.init());
