import { pluginCardTemplate }
from "../modules/cards/plugin-card.template.js";

export function renderPlugins(
  target,
  plugins
) {

  target.innerHTML =
    plugins
      .map(plugin =>
        pluginCardTemplate(plugin)
      )
      .join("");

} 
