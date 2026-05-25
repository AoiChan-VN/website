import { loadPortfolio }
from "./modules/load-portfolio.js";

import { updateSafeArea }
from "./modules/main-safe-area.js";

async function initializeApp() {

  try {

    updateSafeArea();

    await loadPortfolio();

  } catch (error) {

    console.error(
      "Initialize App Failed:",
      error
    );

  }

}

window.addEventListener(
  "resize",
  updateSafeArea
);

window.addEventListener(
  "orientationchange",
  updateSafeArea
);

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);
