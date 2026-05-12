import { Desktop }
from "../ui/desktop.js";

import { Router }
from "./router.js";

import { Dock }
from "../ui/dock.js";

import { Taskbar }
from "../ui/taskbar.js";

export const Runtime = {

  desktop:null,

  windows:null,

  initialize(){

    this.desktop =
      document.getElementById(
        "desktop-layer"
      );

    this.windows =
      document.getElementById(
        "window-layer"
      );

    this.renderDesktop();

    Taskbar.initialize();

    Router.initialize();

  },

  renderDesktop(){

    this.desktop.innerHTML = `
      <div class="desktop-wallpaper"></div>

      <div class="desktop-grid"></div>

      <div class="system-dock"></div>
    `;

    Desktop.render(
      this.desktop
    );

    Dock.render(
      this.desktop.querySelector(
        ".system-dock"
      )
    );

  }

};
