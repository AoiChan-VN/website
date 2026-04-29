import Component from './core/Component.js';
import Navbar from './components/Navbar.js';
import ProjectCard from './components/ProjectCard.js';
import { parseMarkdown } from './utils/Parser.js';
import { plugins, resources, videos } from './store/data.js';

class App extends Component {
    setup() {
        this.state = { hash: window.location.hash || '#/' };
        window.addEventListener('hashchange', () => {
            this.setState({ hash: window.location.hash || '#/' });
            window.scrollTo(0, 0);
        });
    }

    // Xử lý ảnh: Ưu tiên assets/ nếu không có http
    getImg(path) {
        if (!path) return './assets/img/default.png';
        return path.startsWith('http') ? path : `./${path}`;
    }

    // Xử lý Content: Ưu tiên đọc file .md trong folder content/
    async getContent(item) {
        if (item.file && item.file.endsWith('.md')) {
            try {
                const res = await fetch(`./${item.file}`);
                if (res.ok) return parseMarkdown(await res.text());
            } catch (e) { console.error("Lỗi file .md"); }
        }
        return parseMarkdown(item.desc || "Không có nội dung chi tiết.");
    }

    async template() {
        const hash = this.state.hash;

        // TRANG CHI TIẾT
        if (hash.startsWith('#/plugins/') || hash.startsWith('#/resources/')) {
            const isPlugin = hash.startsWith('#/plugins/');
            const id = isPlugin ? hash.replace('#/plugins/', '') : hash.replace('#/resources/', '');
            const item = (isPlugin ? plugins : resources).find(p => p.id === id);

            if (!item) return '<h1>404 - Không tìm thấy</h1>';

            return `
                <div class="container">
                    <button onclick="window.history.back()">← Quay lại</button>
                    <div style="display:flex; align-items:center; gap:20px; margin:20px 0;">
                        <img src="${this.getImg(item.image)}" width="80">
                        <h1>${item.title}</h1>
                    </div>
                    <hr>
                    <div class="content">${await this.getContent(item)}</div>
                </div>
            `;
        }

        // TRANG DANH SÁCH
        if (hash === '#/plugins') return `<div class="container"><h2>Plugins</h2><div id="plugin-list" class="grid"></div></div>`;
        if (hash === '#/resources') return `<div class="container"><h2>Resources</h2><div id="resource-list" class="grid"></div></div>`;

        // TRANG CHỦ
        return `<div class="hero"><h1>Minecraft Portfolio</h1><p>Phát triển bởi Vanila JS</p></div>`;
    }

    mounted() {
        new Navbar(this.$target.querySelector('#header-nav') || document.createElement('div'));
        
        const renderList = (selector, data, type) => {
            const $el = this.$target.querySelector(selector);
            if ($el) {
                data.forEach(item => {
                    const $div = document.createElement('div');
                    $el.appendChild($div);
                    new ProjectCard($div, { ...item, image: this.getImg(item.image), type });
                });
            }
        };
        renderList('#plugin-list', plugins, 'plugins');
        renderList('#resource-list', resources, 'resources');
    }
}

new App(document.querySelector('#app'));
