import Component from './core/Component.js';
import { projects } from './store/data.js';
import ProjectCard from './components/ProjectCard.js';

class App extends Component {
    template() {
        return `
            <header>
                <nav><strong>MY PORTFOLIO</strong></nav>
            </header>
            <main>
                <section id="hero">
                    <h1>Creative Developer</h1>
                    <p>Minimalist design, Maximum performance.</p>
                </section>
                <section id="projects">
                    <h2>Selected Work</h2>
                    <div id="project-list" class="grid"></div>
                </section>
            </main>
        `;
    }

    render() {
        super.render(); // Vẽ khung HTML trước
        
        // Tìm vị trí để đổ danh sách card vào
        const $projectList = this.$target.querySelector('#project-list');
        
        // Tái sử dụng ProjectCard cho từng item trong data
        projects.forEach(item => {
            const $wrapper = document.createElement('div');
            $projectList.appendChild($wrapper);
            new ProjectCard($wrapper, item);
        });
    }
}

new App(document.querySelector('#app'));
