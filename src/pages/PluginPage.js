// pages/PluginPage.js
import Component from "../core/Component.js";
import store from "../core/Store.js";
import ProjectCard from "../components/project/ProjectCard.js";

export default class PluginPage extends Component {
  setup() {
    this.state = store.state.plugins;
  }

  template() {
    return `<div id="plugin-list"></div>`;
  }

  mounted() {
    const container = this.target.querySelector("#plugin-list");

    this.state.forEach(plugin => {
      const el = document.createElement("div");
      container.appendChild(el);

      new ProjectCard({
        target: el,
        props: plugin,
      });
    });
  }
}
