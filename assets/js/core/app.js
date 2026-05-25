import { APP_CONFIG }
from "./config.js";

import { appState }
from "./state.js";

import { fetchJSON }
from "../services/fetcher.js";

import { validateItem }
from "../services/parser.js";

import { renderCards }
from "../ui/renderer.js";

import { initializeParallax }
from "../ui/parallax.js";

export async function initializeApp() {

  try {

    initializeParallax();

    const folders =
      await fetchJSON(
        APP_CONFIG.dataFile
      );

    const allItems = [];

    for (const folderPath of folders) {

      const items =
        await fetchJSON(folderPath);

      items.forEach((item) => {

        if (
          validateItem(item)
        ) {
          allItems.push(item);
        }

      });

    }

    appState.items =
      allItems;

    renderCards(
      appState.items
    );

  } catch (error) {

    console.error(error);

  }

} 
