/**
 * Renderer Engine 2026
 * Cơ chế: Tự động map dữ liệu từ JSON vào DOM Template
 */
export const Renderer = {
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Lỗi tải dữ liệu: ${url}`);
            return await response.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    renderHero(data) {
        const container = document.getElementById('hero');
        container.innerHTML = `
            <div class="container">
                <h1 class="fade-in">${data.name}</h1>
                <p class="subtitle">${data.role}</p>
                <p class="description">${data.bio}</p>
                <div class="cta-group">
                    <a href="#projects" class="btn btn-primary">Xem Dự Án</a>
                </div>
            </div>
        `;
    },

    renderSkills(skills) {
        const container = document.getElementById('about');
        const skillHtml = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
        container.innerHTML = `
            <div class="container">
                <h2>Kỹ năng chuyên môn</h2>
                <div class="skill-grid">${skillHtml}</div>
            </div>
        `;
    }
};
