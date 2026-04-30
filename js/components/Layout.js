import { siteData } from '../data/database.js';

export const Header = () => {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    return `
    <header class="navbar">
        <div class="logo">
            <img src="${siteData.settings.logo}" alt="Logo" class="logo-img" onerror="this.src='https://placehold.co'">
            <span>MC SERVER</span>
        </div>
        <nav>
            <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Trang Chủ</a>
            <a href="plugins.html" class="${currentPage === 'plugins.html' ? 'active' : ''}">Plugins</a>
            <a href="resources.html" class="${currentPage === 'resources.html' ? 'active' : ''}">Tài Nguyên</a>
            <a href="youtube.html" class="${currentPage === 'youtube.html' ? 'active' : ''}">Youtube</a>
            <button onclick="window.openSettings()" class="btn-settings">⚙️ Settings</button>
        </nav>
    </header>`;
};

export const SettingsPanel = () => {
    return `
    <div id="settings-modal" class="modal-overlay" style="display:none;">
        <div class="card settings-content">
            <h3>⚙️ Cài Đặt</h3>
            <div class="setting-item">
                <span>Nhạc nền</span>
                <input type="checkbox" id="music-toggle" onchange="window.toggleMusic(this.checked)">
            </div>
            <div class="setting-item">
                <span>Chọn bài</span>
                <select id="track-list" onchange="window.changeTrack(this.value)">
                    <option value="./music/background-1.mp3">Bản nhạc 1</option>
                    <option value="./music/background-2.mp3">Bản nhạc 2</option>
                </select>
            </div>
            <div class="setting-item">
                <span>Giao diện</span>
                <button onclick="window.toggleTheme()" class="btn-primary">Đổi Dark/Light</button>
            </div>
            <button onclick="window.closeSettings()" class="btn-primary" style="background:#ff4444; width:100%; margin-top:15px;">Đóng</button>
        </div>
    </div>
    <audio id="bg-audio" loop></audio>`;
};
