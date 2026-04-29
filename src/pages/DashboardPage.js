// pages/DashboardPage.js
import Component from "../core/Component.js";
import store from "../core/Store.js";
import StatCard from "../components/dashboard/StatCard.js";

export default class DashboardPage extends Component {
  setup() {
    this.state = store.state.serverStatus;

    store.subscribe("serverStatus", (data) => {
      this.state = data;
      this.render();
      this.mounted();
    });
  }

  template() {
    return `
      <div class="dashboard">
        <div id="cpu"></div>
        <div id="ram"></div>
        <div id="players"></div>
      </div>
    `;
  }

  mounted() {
    new StatCard({
      target: this.target.querySelector("#cpu"),
      props: { title: "CPU Usage", value: this.state.cpu + "%" },
    });

    new StatCard({
      target: this.target.querySelector("#ram"),
      props: { title: "RAM Usage", value: this.state.ram + " MB" },
    });

    new StatCard({
      target: this.target.querySelector("#players"),
      props: { title: "Players Online", value: this.state.players },
    });
  }
} 
