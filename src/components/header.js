export const renderHeader = () => {
    return `
    <header>
        <div class="container" style="display:flex; justify-content:space-between; align-items:center;">
            <div class="logo">
                <img src="/assets/img/logo/logo.png" alt="AoiChan Logo" height="40">
            </div>
            <nav>
                <ul>
                    <li><a href="/index.html">Trang chủ</a></li>
                    <li><a href="../pages/plugins.html">Plugins</a></li>
                    <li><a href="../pages/resource.html">Resources</a></li>
                    <li><a href="../pages/channel.html">YouTube</a></li>
                    <li><div class="theme-switch">🌓 Toggle Theme</div></li>
                </ul>
            </nav>
        </div>
    </header>`;
};
