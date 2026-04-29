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

    // Hàm xử lý đường dẫn ảnh (Local assets vs Remote link)
    getImg(path) {
        if (!path) return 'assets/img/default.png';
        return path.startsWith('http') ? path : `./${path}`;
    }

    async template() {
        const hash = this.state.hash;

        // TRANG CHI TIẾT PLUGIN
        if (hash.startsWith('#/plugins/')) {
            const id = hash.replace('#/plugins/', '');
            const item = plugins.find(p => p.id === id);
            if (!item) return '<h1>Plugin không tồn tại</h1>';

            // Xử lý content: Nếu là file .md thì fetch, nếu là text thì parse luôn
            let rawContent = item.content;
            if (item.content.endsWith('.md')) {
                try {
                    const response = await fetch(`./${item.content}`);
                    rawContent = await response.text();
                } catch (e) {
                    rawContent = "Lỗi: Không thể load file nội dung nội bộ.";
                }
            }

            return `
                <section class="detail">
                    <button onclick="window.history.back()">← Quay lại</button>
                    <div class="header">
                        <img src="${this.getImg(item.image)}" width="120">
                        <h1>${item.title}</h1>
                    </div>
                    <div class="markdown-body">${parseMarkdown(rawContent)}</div>
                </section>
            `;
        }

        // CÁC TRANG DANH SÁCH (Sử dụng khung để mounted render list)
        if (hash === '#/plugins') return `<section><h2>Plugins</h2><div id="list" class="grid"></div></section>`;
        if (hash === '#/resources') return `<section><h2>Resources</h2><div id="list" class="grid"></div></section>`;
        
        // TRANG CHỦ
        return `<section class="hero"><h1>Minecraft Developer</h1><p>Welcome to my portfolio</p></section>`;
    }

    // mounted chạy sau khi HTML được nạp vào DOM
    mounted() {
        new Navbar(this.$target.querySelector('#header-nav') || document.createElement('div'));
        
        const listContainer = this.$target.querySelector('#list');
        if (listContainer) {
            const isPlugin = this.state.hash === '#/plugins';
            const data = isPlugin ? plugins : resources;
            data.forEach(item => {
                const $wrapper = document.createElement('div');
                listContainer.appendChild($wrapper);
                // Truyền ảnh đã xử lý đường dẫn vào ProjectCard
                new ProjectCard($wrapper, { ...item, image: this.getImg(item.image) });
            });
        }
    }
}

new App(document.querySelector('#app'));
