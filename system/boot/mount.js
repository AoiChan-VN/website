import { Registry }
from "../core/registry.js";

import { WindowManager }
from "../ui/window.js";

import { lazyImport }
from "../core/lazy.js";

import { NotificationCenter }
from "../ui/notification.js";

export const Mount = {

  async open(appId){

    const config =
      Registry.get(appId);

    if(!config){

      throw new Error(
        `missing app ${appId}`
      );

    }

    NotificationCenter.push({

      title:"Launching App",

      description:
        `Loading ${appId}...`

    });

    const module =
      await lazyImport(
        config.entry
      );

    const app =
      await module.createApp();

    WindowManager.create({

      id:app.id,

      title:app.title,

      content:app.element

    });

  }

};
