export const renderHeader = (isSub = false) => {
    const prefix = isSub ? '../' : './';
    const loc = window.location.pathname;
    const navs = [
        { n: 'Home', h: 'index.html' },
        { n: 'Plugins', h: 'pages/plugins.html' },
        { n: 'Resource', h: 'pages/resource.html' },
        { n: 'Channel', h: 'pages/channel.html' }
    ];

    document.querySelector('header').innerHTML = `
        <div class="container" style="padding: clamp(30px, 5vh, 60px) 0; display: flex; justify-content: space-between; align-items: center;">
            <div class="logo" style="font-weight: 900; letter-spacing: -1px; font-size: 1.2rem;">AOI<span>CHAN</span></div>
            <nav style="display: flex; gap: clamp(20px, 3vw, 50px);">
                ${navs.map(item => `
                    <a href="${prefix}${item.h}" style="text-decoration:none; font-size: 12px; letter-spacing: 2px; color: ${loc.includes(item.h.split('/')[1] || 'index') ? 'var(--accent)' : '#444'}; transition: 0.3s;">
                        ${item.n.toUpperCase()}
                    </a>
                `).join('')}
            </nav>
        </div>
    `;
};
