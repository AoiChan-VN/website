export const Renderer = {
    
    async fetchData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (err) { return null; }
    },

    renderHero(data) {
        const container = document.getElementById('hero');
        container.innerHTML = `
            <div class="container fade-in">
                <h1>${data.name}</h1>
                <p class="subtitle">${data.role}</p>
                <p class="description">${data.bio}</p>
            </div>
        `;
    },

    renderProjects(projects) {
        const container = document.getElementById('projects');
        if (!projects) return;

        const projectHtml = projects.map(item => `
            <div class="project-card" data-category="${item.category}">
                <div class="project-image" style="background-image: url('${item.image}')">
                    <div class="project-overlay">
                        <a href="${item.link}" target="_blank" class="view-btn">Khám phá</a>
                    </div>
                </div>
                <div class="project-info">
                    <span class="category-tag">${item.category}</span>
                    <h3>${item.title}</h3>
                    <div class="tech-stack">
                        ${item.tech.map(t => `<code>${t}</code>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="container">
                <h2 class="section-title">Dự Án Tiêu Biểu</h2>
                <div class="project-grid">${projectHtml}</div>
            </div>
        `;
    }
};
