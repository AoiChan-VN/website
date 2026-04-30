export function ProjectCard(item) {
    return `
        <div class="card">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <span>Phiên bản: ${item.version}</span>
            <p>${item.description}</p>
            <button>Xem chi tiết</button>
        </div>
    `;
}
 
