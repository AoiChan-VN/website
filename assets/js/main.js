import { renderHero, renderProjects, renderSkills } from './render.js';

const App = {
    async init() {
        try {
            // 1. Tự động load dữ liệu từ file JSON
            const response = await fetch('./assets/data/profile.json');
            if (!response.ok) throw new Error('Không thể tải dữ liệu');
            const data = await response.json();

            // 2. Điều phối Render dữ liệu vào DOM
            this.buildSite(data);
            this.initReveal();
        } catch (error) {
            console.error('Lỗi hệ thống:', error);
            document.getElementById('app').innerHTML = `<p>Lỗi tải dữ liệu. Vui lòng kiểm tra file JSON.</p>`;
        }
    },

    buildSite(data) {
        if (data.hero) renderHero(data.hero);
        if (data.projects) renderProjects(data.projects);
        if (data.skills) renderSkills(data.skills);
        
        console.log("Web Loaded: 100% Optimized");
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());

initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .card').forEach(el => observer.observe(el));
}
