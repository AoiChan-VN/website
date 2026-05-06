/**
 * @engine SPA-Lite 2026
 * @author AoiChan
 */
class AoiEngine {
    constructor() {
        this.init();
    }

    async navigate(url, push = true) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Cập nhật Content & Title
            document.title = doc.title;
            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
            
            if (push) window.history.pushState({}, '', url);
            
            // Khởi tạo lại Component & Logic trang mới
            this.reinitPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error("Navigation failed:", err);
            window.location.href = url; // Fallback
        }
    }

    reinitPage() {
        // Tự động nhận diện folder để import đúng
        const isSub = window.location.pathname.includes('/pages/');
        import(isSub ? '../src/components/header.js' : './src/components/header.js').then(m => m.renderHeader(isSub));
        import(isSub ? '../src/components/footer.js' : './src/components/footer.js').then(m => m.renderFooter());
    }

    init() {
        document.addEventListener('click', e => {
            const a = e.target.closest('nav a');
            if (a && a.href.startsWith(window.location.origin)) {
                e.preventDefault();
                this.navigate(a.href);
            }
        });
        window.addEventListener('popstate', () => this.navigate(window.location.href, false));
    }
}
export const App = new AoiEngine();
