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
    }
};
 
