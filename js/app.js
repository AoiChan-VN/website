import { fetchData } from './loader.js';
import { Renderer } from './renderer.js';

async function initApp() {
    // Load Data
    const profile = await fetchData('./data/profile.json');
    
    // Core Elements
    const navEl = document.getElementById('main-nav');
    const heroEl = document.getElementById('hero');

    // Injection (Nếu có data thì mới render để tránh lỗi)
    if (profile) {
        navEl.innerHTML = Renderer.nav(profile);
        heroEl.innerHTML = Renderer.hero(profile);
    }
}

// Chạy App khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', initApp);
 
