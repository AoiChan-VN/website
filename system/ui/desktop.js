import { Registry } from "../core/registry.js";
import { Mount } from "../boot/mount.js";

export const Desktop = {

  render(container){

    const grid =
      container.querySelector(
        ".desktop-grid"
      );

    const apps =
      Object.values(
        Registry.data.apps
      );

    for(const app of apps){

      const node =
        document.createElement("div");

      node.className =
        "desktop-app";

      node.dataset.app =
        app.id;

      node.innerHTML = `
        <div class="desktop-app-icon">
          <img
            src="./assets/icons/${app.id}.png"
            alt="${app.id}"
          >
        </div>

        <div class="desktop-app-name">
          ${app.id}
        </div>
      `;

      node.addEventListener(
        "dblclick",
        () => {

          Mount.open(app.id);

        }
      );

      grid.appendChild(node);

    }

  }

}; 
