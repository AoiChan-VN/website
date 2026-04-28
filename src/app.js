import Component from './core/Component.js';
import Navbar from './components/Navbar.js';
import ProjectCard from './components/ProjectCard.js';
import { projects } from './store/data.js';

class App extends Component {
    setup() {
        // Lấy hash hiện tại, nếu trống thì mặc định là #/
        this.state = { hash: window.location.hash || '#/' };
        
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Lắng nghe sự kiện thay đổi hash (khi user click link hoặc back trang)
        window.addEventListener('hashchange', () => {
            this.setState({ hash: window.location.hash || '#/' });
        });
    }

    template() {
        return `
            <header id="header-nav"></header>
            <main id="main-content">${this.createRoute()}</main>
            <footer><p>&copy; 2024 Portfolio Pure JS</p></footer>
        `;
    }

    createRoute() {
        const hash = this.state.hash;
        if (hash === '#/' || hash === '') {
            return `
                <section class="hero">
                    <h1>Xin chào, tôi là Developer</h1>
                    <p>Sản phẩm này được build 100% từ Vanilla JS.</p>
                </section>
            `;
        } else if (hash === '#/projects') {
            return `
                <section class="projects-page">
                    <h2>Dự án của tôi</h2>
                    <div id="project-list" class="grid"></div>
                </section>
            `;
        } else if (hash === '#/contact') {
            return `
                <section class="contact">
                    <h2>Liên hệ</h2>
                    <p>Kết nối với tôi qua email: contact@example.com</p>
                </section>
            `;
        }
        return `<h1>404 Not Found</h1>`;
    }

    render() {
        super.render();
        new Navbar(this.$target.querySelector('#header-nav'));

        const $list = this.$target.querySelector('#project-list');
        if ($list) {
            projects.forEach(item => {
                const $wrapper = document.createElement('div');
                $list.appendChild($wrapper);
                new ProjectCard($wrapper, item);
            });
        }
    }
}

new App(document.querySelector('#app'));
