export const SettingsPanel = () => {
    return `
    <div id="settings-modal" class="modal-settings" style="display:none;">
        <div class="settings-content">
            <h3>⚙️ Cài đặt hệ thống</h3>
            <hr>
            <div class="setting-item">
                <span>Chế độ tối:</span>
                <input type="checkbox" id="theme-toggle" onclick="toggleTheme()">
            </div>
            <div class="setting-item">
                <span>Nhạc nền:</span>
                <input type="checkbox" id="music-toggle" onclick="toggleMusic()">
                <select id="track-list" onchange="changeTrack(this.value)">
                    <option value="music/song1.mp3">Minecraft Calm 1</option>
                    <option value="music/song2.mp3">Minecraft Calm 2</option>
                </select>
            </div>
            <button onclick="closeSettings()" class="btn-close">Đóng</button>
        </div>
    </div>
    <audio id="bg-audio" loop></audio>
    `;
};
 
