import { Renderer } from './Renderer.js';
import { Panel } from './Panel.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainRenderer = new Renderer('card-grid');
    const sidePanel = new Panel();

    // Khởi tạo dữ liệu chính
    mainRenderer.init('./data/profile.json');

    // Event Delegation (Tối ưu performance)
    document.getElementById('card-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.glass-card');
        if (card) {
            const detailPath = card.getAttribute('data-path');
            sidePanel.show(detailPath);
        }
    });
});
 
