import { Renderer } from './renderer.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load dữ liệu từ JSON
    const profileData = await Renderer.fetchData('./data/profile.json');

    if (profileData) {
        // 2. Thực hiện render tự động
        Renderer.renderHero(profileData.personal);
        Renderer.renderSkills(profileData.skills);
        
        // 3. Xóa loader sau khi hoàn tất
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
});
