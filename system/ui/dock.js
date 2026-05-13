import { Registry }
from "../core/registry.js";

import { Mount }
from "../boot/mount.js";

export const DockRuntime = {

  async initialize(){

    const dock =
      document.createElement("div");

    dock.className =
      "system-dock";

    const apps =
      Registry.all();

    for(const app of apps){

      const item =
        document.createElement("button");

      item.className =
        "dock-item";

      item.innerHTML = `
        <img
          src="${app.icon}"
          alt="${app.title}"
        >
      `;

      item.addEventListener(
        "click",
        () => {

          Mount.open(app.id);

        }
      );

      dock.appendChild(item);

    }

    document.body.appendChild(
      dock
    );

  }

};
