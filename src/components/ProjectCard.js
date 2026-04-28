import Component from '../core/Component.js';

export default class ProjectCard extends Component {
    template() {
        const { title, desc, tech, image, link } = this.props;
        return `
            <div class="card">
                <img src="${image}" alt="${title}" class="card-img">
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <div class="tech-stack">
                        ${tech.map(t => `<span class="badge">${t}</span>`).join('')}
                    </div>
                    <a href="${link}" class="btn-link">Xem chi tiết</a>
                </div>
            </div>
        `;
    }
}
