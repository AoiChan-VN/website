import { loadPortfolio }
from "./modules/load-portfolio.js";

async function initializeApp() {

  try {

    await loadPortfolio();

  } catch (error) {

    console.error(
      "Initialize App Failed:",
      error
    );

  }

}

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);
