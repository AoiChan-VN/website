import { createCard }
from "./cards.js";

export function renderCards(items) {

  const container =
    document.getElementById(
      "cards-container"
    );

  container.innerHTML = "";

  items.forEach((item) => {

    const card =
      createCard(item);

    container.appendChild(card);

  });

} 
