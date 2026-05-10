export const Renderer = {
    hero: (data) => {
        return `
            <div class="hero-content">
                <h1>${data.name}</h1>
                <p class="fade-in">${data.role}</p>
                <div class="bio">${data.bio}</div>
            </div>
        `;
    },
    
    nav: (data) => {
        return `
            <div class="logo">PORTFOLIO.2026</div>
            <div class="links">
                <a href="#projects">Work</a>
                <a href="#about">About</a>
                <a href="${data.socials.github}" target="_blank">GitHub</a>
            </div>
        `;
    },
    
    projectCard: (project) => {
        const tags = project.tech.map(t => `<span class="tag">${t}</span>`).join('');
        return `
            <div class="card fade-in">
                <img src="${project.image}" alt="${project.title}" class="card-image" loading="lazy">
                <div class="card-info">
                    <div class="card-category">${project.category}</div>
                    <h3 class="card-title">${project.title}</h3>
                    <div class="tech-stack">${tags}</div>
                </div>
            </div>
        `;
    },

    projectSection: (projects) => {
        return `
            <div class="section-header">
                <h2 class="reveal-text">Selected Works</h2>
            </div>
            <div class="project-grid">
                ${projects.map(p => Renderer.projectCard(p)).join('')}
            </div>
        `;
    },

    about: (data) => {
        const skillHtml = data.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');
        return `
            <div class="about-grid fade-in">
                <div>
                    <h2 class="section-title">Philosophy</h2>
                    <p>${data.about}</p>
                </div>
                <div>
                    <h3>Expertise</h3>
                    <div class="skill-tags">${skillHtml}</div>
                </div>
            </div>
        `;
    },

    footer: (data) => {
        return `
            <div class="container">
                <p>Have a grand idea?</p>
                <a href="mailto:${data.socials.email}" class="contact-link">Let's Talk.</a>
                <div class="social-icons" style="margin-top: 30px;">
                    <a href="${data.socials.github}">GitHub</a> / <a href="${data.socials.linkedin}">LinkedIn</a>
                </div>
                <p class="copyright">© 2026 Crafted by ${data.name}. No libraries, just pure code.</p>
            </div>
        `;
    }
};
