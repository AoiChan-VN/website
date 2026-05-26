import { loadDatabase } from "./core/database.js";
import { renderCards } from "./renderer/cards.js";
import { setupPanel } from "./modules/panel.js";

async function init() {

  setupPanel();

  const data = await loadDatabase();

  renderCards(data);

}

init(); 
