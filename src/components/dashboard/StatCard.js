// components/dashboard/StatCard.js
import Component from "../../core/Component.js";

export default class StatCard extends Component {
  template() {
    const { title, value } = this.props;

    return `
      <div class="stat-card">
        <h3>${title}</h3>
        <p>${value}</p>
      </div>
    `;
  }
} 
