import { Renderer } from './Renderer.js';
import { Panel } from './Panel.js';

// Hàm helper để fix lỗi đường dẫn trên GitHub Pages
const getCorrectPath = (relativePath) => {
    const isGithub = window.location.hostname.includes('github.io');
    if (isGithub) {
        const repoName = window.location.pathname.split('/')[1];
        return `/${repoName}/${relativePath.replace(/^\.\//, '')}`;
    }
    return relativePath;
};

document.addEventListener('DOMContentLoaded', () => {
    const mainGrid = new Renderer('card-grid');
    const sidePanel = new Panel();

    // Khởi tạo - dùng path đã được normalize
    mainGrid.init(getCorrectPath('data/profile.json'));

    document.getElementById('card-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.glass-card');
        if (card) {
            const path = getCorrectPath(card.dataset.path);
            sidePanel.open(path);
        }
    });
});
