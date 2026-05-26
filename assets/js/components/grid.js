import { createCard }
from "./card.js";

export function createGrid(items){

  const grid =
    document.createElement("section");

  grid.className =
    "grid-layout";

  items.forEach(item => {

    const card =
      createCard(item);

    grid.appendChild(card);

  });

  return grid;
} 
