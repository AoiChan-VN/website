import Component from '../core/Component.js';

export default class ProjectCard extends Component {
    template() {
        const { id, title, desc, image, type } = this.props;
        return `
            <div class="card">
                <img src="${image}" class="card-img">
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <a href="#/${type}/${id}" class="btn-link">Xem chi tiết →</a>
                </div>
            </div>
        `;
    }
}
