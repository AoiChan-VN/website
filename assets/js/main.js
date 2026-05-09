import { Renderer } from './renderer.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Load đồng thời nhiều nguồn dữ liệu bằng Promise.all để tối ưu tốc độ
    const [profile, projects] = await Promise.all([
        Renderer.fetchData('./data/profile.json'),
        Renderer.fetchData('./data/projects.json')
    ]);

    if (profile) Renderer.renderHero(profile.personal);
    if (projects) Renderer.renderProjects(projects);

    // Xử lý Loader
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
});
