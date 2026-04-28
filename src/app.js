import Component from './core/Component.js';
import { projects } from './store/data.js';
import ProjectCard from './components/ProjectCard.js';
import Navbar from './components/Navbar.js';

class App extends Component {
    setup() {
        // Kiểm tra theme đã lưu trong máy người dùng chưa
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    template() {
        return `
            <header id="header-nav"></header>
            <main>
                <section id="home">
                    <div id="hero">
                        <h1>Fullstack Developer</h1>
                        <p>Specializing in High-Performance Web Applications</p>
                    </div>
                </section>
                <section id="projects">
                    <h2>Latest Projects</h2>
                    <div id="project-list" class="grid"></div>
                </section>
                <section id="contact" style="text-align: center; padding: 100px 0;">
                    <h2>Let's Work Together</h2>
                    <p>Email: yourname@example.com</p>
                </section>
            </main>
            <footer style="padding: 40px 0; text-align: center; border-top: 1px solid var(--gray);">
                <p>&copy; 2024 Your Name. Built with Pure JS.</p>
            </footer>
        `;
    }

    render() {
        super.render();
        
        // Render Navbar
        new Navbar(this.$target.querySelector('#header-nav'));

        // Render Projects
        const $projectList = this.$target.querySelector('#project-list');
        projects.forEach(item => {
            const $wrapper = document.createElement('div');
            $projectList.appendChild($wrapper);
            new ProjectCard($wrapper, item);
        });
    }
}

new App(document.querySelector('#app'));
