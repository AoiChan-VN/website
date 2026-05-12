import { Registry } from "../core/registry.js";
import { WindowManager } from "../ui/window.js";

export const Mount = {

  async open(appId){

    const config =
      Registry.get(appId);

    if(!config){

      throw new Error(
        `missing app ${appId}`
      );

    }

    const module =
      await import(
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
