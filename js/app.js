const App = {
    async init() {
        const [profile, projects] = await Promise.all([
            fetch('./data/profile.json').then(r => r.json()),
            fetch('./data/projects.json').then(r => r.json())
        ]);

        this.render(profile, projects);
    },

    render(p, projects) {
        // Hero
        document.getElementById('hero').innerHTML = `
            <div class="container">
                <h1 style="font-size: 4rem;">${p.name}</h1>
                <p style="color: var(--sub-text); font-size: 1.2rem;">${p.role}</p>
            </div>`;

        // Projects
        const grid = projects.map(item => `
            <div class="card">
                <img src="${item.image}" class="card-img" onerror="this.src='https://placehold.co'">
                <h3>${item.title}</h3>
                <p style="font-size: 0.8rem; color: var(--sub-text);">${item.category}</p>
            </div>
        `).join('');
        
        document.getElementById('projects').innerHTML = `
            <div class="container">
                <h2>Selected Works</h2>
                <div class="project-grid">${grid}</div>
            </div>`;

        // Expertise
        const skills = p.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');
        document.getElementById('about').innerHTML = `
            <div class="container">
                <h2>Expertise</h2>
                <div>${skills}</div>
            </div>`;
    }
};
App.init();
