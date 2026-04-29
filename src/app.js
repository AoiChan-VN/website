import Component from './core/Component.js';
import Navbar from './components/Navbar.js';
import ProjectCard from './components/ProjectCard.js';
import { plugins, resources, videos } from './store/data.js';

class App extends Component {
    setup() {
        this.state = { hash: window.location.hash || '#/' };
        const savedTheme = localStorage.getItem('theme') || 'dark'; // Minecraft dev thường thích Dark Mode
        document.documentElement.setAttribute('data-theme', savedTheme);
        window.addEventListener('hashchange', () => {
            this.setState({ hash: window.location.hash || '#/' });
            window.scrollTo(0, 0); // Cuộn lên đầu khi đổi trang
        });
    }

    template() {
        return `
            <header id="header-nav"></header>
            <main id="main-content">${this.createRoute()}</main>
            <footer><p>&copy; 2024 Minecraft Server Portfolio</p></footer>
        `;
    }

    createRoute() {
        const hash = this.state.hash;

        // Trang chủ
        if (hash === '#/') return `
            <section class="hero">
                <h1>Minecraft Server Developer</h1>
                <p>Chuyên cung cấp Plugins & Resource Packs chất lượng cao.</p>
            </section>
        `;

        // Trang danh sách Plugins
        if (hash === '#/plugins') return `
            <section>
                <h2>Premium Plugins</h2>
                <div id="plugin-list" class="grid"></div>
            </section>
        `;

        // Trang danh sách Resources
        if (hash === '#/resources') return `
            <section>
                <h2>Resource Packs</h2>
                <div id="resource-list" class="grid"></div>
            </section>
        `;

        // Trang Media (Video/Ảnh)
        if (hash === '#/media') return `
            <section>
                <h2>Server Media</h2>
                <div class="grid">
                    ${videos.map(v => `
                        <div class="card">
                            <iframe width="100%" height="200" src="${v.url}" frameborder="0"></iframe>
                            <div class="card-content"><h3>${v.title}</h3></div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;

        // Logic trang CHI TIẾT Plugin (Dynamic Route)
        if (hash.startsWith('#/plugins/')) {
            const id = hash.replace('#/plugins/', '');
            const item = plugins.find(p => p.id === id);
            return item ? `
                <section class="detail-page">
                    <a href="#/plugins">← Quay lại</a>
                    <img src="${item.image}" class="detail-img">
                    <h1>${item.title}</h1>
                    <div class="content">${item.content}</div>
                </section>
            ` : '<h1>Không tìm thấy Plugin</h1>';
        }

        return `<h1>404 - Trang không tồn tại</h1>`;
    }

    render() {
        super.render();
        new Navbar(this.$target.querySelector('#header-nav'));

        // Tái sử dụng logic render card cho các trang khác nhau
        const renderList = (selector, data, type) => {
            const $el = this.$target.querySelector(selector);
            if ($el) {
                data.forEach(item => {
                    const $wrapper = document.createElement('div');
                    $el.appendChild($wrapper);
                    new ProjectCard($wrapper, { ...item, type });
                });
            }
        };

        renderList('#plugin-list', plugins, 'plugins');
        renderList('#resource-list', resources, 'resources');
    }
}

new App(document.querySelector('#app'));
