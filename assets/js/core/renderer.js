import { createCard } from "../modules/cards.js";

const container = document.getElementById(
  "cards-container"
);

export function renderCards(data) {

  container.innerHTML = "";

  data.forEach((item) => {

    const card = createCard(item);

    container.appendChild(card);

  });

} 
