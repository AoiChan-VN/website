/**
 * @engine AoiChan SPA Lite
 * @description Chuyển trang không reload + Hiệu ứng chuyển cảnh
 */
class AoiEngine {
    constructor() {
        this.initSPA();
    }

    async navigate(url) {
        const main = document.querySelector('main');
        main.style.opacity = '0'; // Hiệu ứng mờ dần trước khi load
        
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        document.title = doc.title;
        main.innerHTML = doc.querySelector('main').innerHTML;
        window.history.pushState({}, '', url);
        
        // Re-run scripts của trang mới
        this.executeScripts(main);
        setTimeout(() => main.style.opacity = '1', 100);
    }

    initSPA() {
        document.addEventListener('click', e => {
            const link = e.target.closest('nav a');
            if (link && link.href.includes(window.location.origin)) {
                e.preventDefault();
                this.navigate(link.href);
            }
        });
    }

    executeScripts(container) {
        container.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }
}
export const Engine = new AoiEngine();
