import { MetricsService }
from "../services/metrics.js";

export const DebugConsole = {

  node:null,

  initialize(){

    this.node =
      document.createElement("div");

    this.node.className =
      "system-debug";

    document.body.appendChild(
      this.node
    );

    this.render();

  },

  render(){

    setInterval(
      () => {

        this.node.innerHTML = `
          <div class="debug-title">
            Runtime Metrics
          </div>

          <div class="debug-item">
            <span>FPS</span>
            <span>
              ${MetricsService.fps}
            </span>
          </div>

          <div class="debug-item">
            <span>Processes</span>
            <span>
              ${MetricsService.processes()}
            </span>
          </div>

          <div class="debug-item">
            <span>Memory</span>
            <span>
              ${
                MetricsService.memory()
                ?? "N/A"
              } MB
            </span>
          </div>
        `;
      },
      500
    );

  }

}; 
