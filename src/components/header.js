export const Header = {
    render: () => `
    <header class="glass-header">
        <div class="container flex-between">
            <div class="logo-area" onclick="location.reload()" style="cursor:pointer">
                <div class="logo-hex">A</div>
                <span class="logo-text">AOICHAN</span>
            </div>
            <div class="header-controls">
                <button onclick="Core.toggleSettings()" class="btn-settings">⚙️</button>
                <button onclick="Core.openPanel('menu')" class="btn-menu">MENU</button>
            </div>
        </div>
    </header>`
};
