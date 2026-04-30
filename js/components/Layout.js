export const Header = () => {
    // Lấy tên trang hiện tại từ URL (ví dụ: plugins.html)
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';

    const navLinks = [
        { name: 'Trang Chủ', href: 'index.html' },
        { name: 'Plugins', href: 'plugins.html' },
        { name: 'Resource Packs', href: 'resources.html' },
        { name: 'Youtube', href: 'youtube.html' },
        { name: 'Download', href: 'download.html' }
    ];

    return `
    <header class="navbar">
        <div class="logo" style="font-weight: bold; color: var(--primary);">MC PORTFOLIO</div>
        <nav>
            ${navLinks.map(link => `
                <a href="${link.href}" class="${currentPage === link.href ? 'active' : ''}">
                    ${link.name}
                </a>
            `).join('')}
        </nav>
    </header>
    `;
};

export const ProjectCard = (item) => {
    return `
    <div class="card">
        <img src="${item.img}" alt="${item.name || item.title}">
        <div class="card-body">
            <h3>${item.name || item.title}</h3>
            <p class="tag">${item.version || item.size || 'Video'}</p>
            <p class="desc">${item.desc || 'Bấm để xem chi tiết.'}</p>
            <button class="btn-primary">Xem chi tiết</button>
        </div>
    </div>
    `;
};
 
