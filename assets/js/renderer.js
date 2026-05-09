const getEl = (id) => document.getElementById(id);

export const renderHero = (data) => {
    getEl('hero').innerHTML = `
        <div class="hero-content">
            <h1>${data.name}</h1>
            <p class="role">${data.role}</p>
            <p class="bio">${data.bio}</p>
        </div>
    `;
};

export const renderProjects = (projects) => {
    const html = projects.map(p => `
        <div class="card">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        </div>
    `).join('');
    
    getEl('projects').innerHTML = `<h2>Projects</h2><div class="grid">${html}</div>`;
};

export const renderSkills = (skills) => {
    getEl('skills').innerHTML = `
        <h2>Skills</h2>
        <div class="skill-list">
            ${skills.map(s => `<span class="skill-item">${s}</span>`).join('')}
        </div>
    `;
};
 
