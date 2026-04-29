// pages/ResourcePage.js
import Component from "../core/Component.js";
import store from "../core/Store.js";

export default class ResourcePage extends Component {
  setup() {
    this.state = store.state.resourcePacks;
  }

  template() {
    return `
      <div class="resources">
        ${this.state.map(r => `
          <div class="card">
            <h3>${r.name}</h3>
            <p>${r.size}</p>
          </div>
        `).join("")}
      </div>
    `;
  }
} 
