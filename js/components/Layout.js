export const Header = () => {
    return `
    <header class="navbar">
        <div class="logo">MC SERVER PORTFOLIO</div>
        <nav>
            <a href="index.html">Trang Chủ</a>
            <a href="plugins.html">Plugins</a>
            <a href="resources.html">Resource Packs</a>
            <a href="youtube.html">Youtube</a>
            <a href="download.html">Download</a>
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
 
