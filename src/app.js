import { Renderer } from './Renderer.js';
import { Panel } from './Panel.js';

const mainGrid = new Renderer('card-grid');
const detailPanel = new Panel();

// Load cards sơ lược
mainGrid.init('./data/profile.json');

// Xử lý sự kiện bấm vào Card
document.getElementById('card-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.glass-card');
    if (card) {
        const path = card.dataset.path; // Lấy path dẫn tới JSON chi tiết
        detailPanel.open(path);
    }
});
