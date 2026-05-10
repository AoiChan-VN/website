const App = {
    async init() {
        const profile = await this.fetchData('./data/profile.json');
        const projects = await this.fetchData('./data/projects.json');

        if (profile) this.renderUI(profile, projects);
        this.initObserver();
    },

    async fetchData(url) {
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (e) { return null; }
    },

    renderUI(profile, projects) {
        // Nav
        document.getElementById('main-nav').innerHTML = `
            <div class="logo">SR.2026</div>
            <div class="links">
                <a href="#projects">Works</a><a href="#about">About</a>
            </div>
        `;

        // Hero
        document.getElementById('hero').innerHTML = `
            <div class="container fade-in">
                <h1 class="reveal-text">${profile.name}</h1>
                <p style="font-size:1.5rem; color:var(--text-secondary)">${profile.role}</p>
            </div>
        `;

        // Projects
        if (projects) {
            const cards = projects.map(p => `
                <div class="card fade-in">
                    <img src="${p.image}" class="card-image">
                    <div class="card-info">
                        <h3>${p.title}</h3>
                        <div style="margin-top:15px">${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    </div>
                </div>
            `).join('');
            document.getElementById('projects').innerHTML = `<div class="container"><div class="project-grid">${cards}</div></div>`;
        }

        // About & Footer
        document.getElementById('about').innerHTML = `
            <div class="container fade-in">
                <div class="about-grid">
                    <div><h2>Philosophy</h2><p>${profile.about}</p></div>
                    <div>${profile.skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}</div>
                </div>
            </div>
        `;
        
        document.getElementById('main-footer').innerHTML = `
            <div class="container fade-in" style="text-align:center">
                <a href="mailto:${profile.socials.email}" style="font-size:3rem; font-weight:800">Get in touch.</a>
            </div>
        `;
    },

    initObserver() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }
};
document.addEventListener('DOMContentLoaded', () => App.init());
