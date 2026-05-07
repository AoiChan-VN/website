export const Sidebar = {
    render: () => `
    <nav class="sidebar">
        <div class="sidebar-logo">A</div>
        <div class="nav-group">
            <button onclick="Core.navigate('home')" class="nav-item" title="Home">🏠</button>
            <button onclick="Core.navigate('plugins')" class="nav-item" title="Plugins">🧩</button>
            <button onclick="Core.navigate('resource')" class="nav-item" title="Resources">📦</button>
        </div>
        <div class="nav-group bottom">
            <button onclick="Core.toggleTheme()" class="nav-item" title="Toggle Theme">🌗</button>
            <button onclick="Core.navigate('settings')" class="nav-item" title="Settings">⚙️</button>
        </div>
    </nav>`
};
 
