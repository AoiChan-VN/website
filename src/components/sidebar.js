export const Navigation = {
    renderSidebar: () => `
        <aside id="sidebar-drawer" class="drawer">
            <div class="drawer-header">
                <h3>Menu System</h3>
                <button onclick="Core.ui.toggleSidebar()" class="close-btn">×</button>
            </div>
            <nav class="drawer-links">
                <button onclick="Core.router('home')">🏠 Trang Chủ</button>
                <button onclick="Core.router('plugins')">🧩 Plugins</button>
                <button onclick="Core.router('resource')">📦 Tài Nguyên</button>
            </nav>
        </aside>
        <div id="overlay" onclick="Core.ui.toggleSidebar()"></div>`,

    renderSettings: () => `
        <div id="settings-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Hệ Thống</h3>
                    <button onclick="Core.ui.toggleSettings()" class="close-btn">×</button>
                </div>
                <div class="modal-body">
                    <div class="s-row">
                        <span>Chế độ nền</span>
                        <button class="btn-action" onclick="Core.ui.toggleTheme()">Đổi Theme</button>
                    </div>
                </div>
            </div>
        </div>`
};
