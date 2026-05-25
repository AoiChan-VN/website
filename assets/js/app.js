import { DATA_FILE } from "./constants.js";
import { fetchJSON } from "./api.js";
import { renderCards } from "./renderer.js";
import { state } from "./state.js";
import { initRouter } from "./router.js";

async function loadData(){

  try{

    const folders =
      await fetchJSON(DATA_FILE);

    const results = [];

    for(const path of folders){

      const data =
        await fetchJSON(path);

      results.push(...data);
    }

    state.cards = results;

    renderCards(state.cards);

  }catch(error){

    console.error(error);
  }
}

async function init(){

  initRouter();

  await loadData();
}

init(); 
