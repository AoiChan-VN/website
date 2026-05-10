import { fetchData } from './loader.js';
import { Renderer } from './renderer.js';

async function initApp() {
    // Fetch song song để tối ưu tốc độ load
    const [profile, projects] = await Promise.all([
        fetchData('./data/profile.json'),
        fetchData('./data/projects.json')
    ]);

    const navEl = document.getElementById('main-nav');
    const heroEl = document.getElementById('hero');
    const projectsEl = document.getElementById('projects');

    // Render logic
    if (profile) {
        navEl.innerHTML = Renderer.nav(profile);
        heroEl.innerHTML = Renderer.hero(profile);
    }

    if (projects && projects.length > 0) {
        projectsEl.innerHTML = Renderer.projectSection(projects);
    }

    // Khởi tạo hiệu ứng sau khi Data đã đổ vào DOM
    initAnimations();
}

function initAnimations() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .card').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initApp);
