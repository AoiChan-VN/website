import { fetchData } from './loader.js';
import { Renderer } from './renderer.js';

async function initApp() {
    // 1. Fetch dữ liệu
    const [profile, projects] = await Promise.all([
        fetchData('./data/profile.json'),
        fetchData('./data/projects.json')
    ]);

    // 2. Định nghĩa các Slots
    const navEl = document.getElementById('main-nav');
    const heroEl = document.getElementById('hero');
    const projectsEl = document.getElementById('projects');
    const aboutEl = document.getElementById('about');
    const footerEl = document.getElementById('main-footer');

    // 3. Render tự động dựa trên Data
    if (profile) {
        navEl.innerHTML = Renderer.nav(profile);
        heroEl.innerHTML = Renderer.hero(profile);
        aboutEl.innerHTML = Renderer.about(profile);
        footerEl.innerHTML = Renderer.footer(profile);
    }

    if (projects) {
        projectsEl.innerHTML = Renderer.projectSection(projects);
    }

    // 4. Khởi tạo Engine tương tác
    initInteractions();
}

function initInteractions() {
    // Hiệu ứng Fade-in khi cuộn chuột
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'var(--transition)';
        observer.observe(el);
    });

    // Smooth scroll cho Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initApp);
