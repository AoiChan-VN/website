import { Desktop }
from "../ui/desktop.js";

import { Router }
from "./router.js";

import { Dock }
from "../ui/dock.js";

import { Taskbar }
from "../ui/taskbar.js";

import { NotificationCenter }
from "../ui/notification.js";

import { ContextMenu }
from "../ui/contextmenu.js";

import { Shortcuts }
from "../ui/shortcuts.js";

import { Search }
from "../ui/search.js";

import { ThemeService }
from "../services/theme.js";

import { WallpaperService }
from "../services/wallpaper.js";

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

    Dock.render(
      document.querySelector(
        ".system-dock"
      )
    );

    NotificationCenter.initialize();

    ContextMenu.initialize();

    Shortcuts.initialize();

    Search.initialize();

    ThemeService.initialize();

    WallpaperService.initialize();

    Router.initialize();

    NotificationCenter.push({
      title:"Nova OS",
      description:
        "System runtime initialized."
    });

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

  }

};
