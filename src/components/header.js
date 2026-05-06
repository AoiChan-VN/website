export const renderHeader = (isSub = false) => {
    const prefix = isSub ? '../' : './';
    const loc = window.location.pathname;
    const headerHTML = `
        <div class="container" style="padding: 40px 0; display: flex; justify-content: space-between; align-items: center;">
            <div class="logo" style="font-weight: 900; font-size: 1.5rem;">AOI<span>CHAN</span></div>
            <nav style="display: flex; gap: 30px;">
                <a href="${prefix}index.html" style="text-decoration:none; color:${loc.includes('index') || loc.endsWith('/') ? 'var(--accent)' : '#888'}; font-size:12px; font-weight:700;">HOME</a>
                <a href="${prefix}pages/plugins.html" style="text-decoration:none; color:${loc.includes('plugins') ? 'var(--accent)' : '#888'}; font-size:12px; font-weight:700;">PLUGINS</a>
                <a href="${prefix}pages/resource.html" style="text-decoration:none; color:${loc.includes('resource') ? 'var(--accent)' : '#888'}; font-size:12px; font-weight:700;">RESOURCE</a>
                <a href="${prefix}pages/channel.html" style="text-decoration:none; color:${loc.includes('channel') ? 'var(--accent)' : '#888'}; font-size:12px; font-weight:700;">CHANNEL</a>
            </nav>
        </div>
    `;
    document.querySelector('header').innerHTML = headerHTML;
};
