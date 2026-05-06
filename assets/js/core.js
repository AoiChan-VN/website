import { renderHeader } from '../../src/components/header.js';
import { renderFooter } from '../../src/components/footer.js';

const Core = {
    init() {
        this.loadComponents();
        this.setupTheme();
        this.lazyLoadMedia();
    },

    loadComponents() {
        const headerRoot = document.getElementById('header-root');
        const footerRoot = document.getElementById('footer-root');
        
        if(headerRoot) headerRoot.innerHTML = renderHeader();
        if(footerRoot) footerRoot.innerHTML = renderFooter();
        
        this.attachEvents();
    },

    setupTheme() {
        const savedTheme = localStorage.getItem('aoichan-theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
    },

    toggleTheme() {
        const current = document.body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('aoichan-theme', next);
    },

    attachEvents() {
        const btn = document.querySelector('.theme-switch');
        if(btn) btn.onclick = () => this.toggleTheme();
    },

    lazyLoadMedia() {
        // Tối ưu load ảnh/video bằng Intersection Observer
        const media = document.querySelectorAll('img, video');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if(el.dataset.src) el.src = el.dataset.src;
                    observer.unobserve(el);
                }
            });
        });
        media.forEach(m => observer.observe(m));
    }
};

window.onload = () => Core.init();
