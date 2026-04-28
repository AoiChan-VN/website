import Component from '../core/Component.js';

export default class ProjectCard extends Component {
    template() {
        const { title, desc, tech, link } = this.props;
        return `
            <div class="card">
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <div class="tech-stack">
                        ${tech.map(t => `<span class="badge">${t}</span>`).join('')}
                    </div>
                    <a href="${link}" class="btn-link">Khám phá →</a>
                </div>
            </div>
        `;
    }
}
 
