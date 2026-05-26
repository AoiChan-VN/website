import { createCard }
from "./cards.js";

import { bindCardActions }
from "./actions.js";

import { initializeCardEffects }
from "./effects.js";

import { lazyLoadImages }
from "../services/image-loader.js";

export function renderCards(items) {

  const container =
    document.getElementById(
      "cards-container"
    );

  container.innerHTML = "";

  items.forEach((item) => {

    const card =
      createCard(item);

    bindCardActions(
      card,
      item
    );

    container.appendChild(card);

  });

  initializeCardEffects();

  lazyLoadImages();

}
