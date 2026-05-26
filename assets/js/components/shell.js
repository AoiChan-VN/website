import { createHeader }
from "./header.js";

import { createGrid }
from "./grid.js";

export function createShell(items){

  const container =
    document.createElement("div");

  container.className =
    "shell-container";

  container.appendChild(
    createHeader()
  );

  container.appendChild(
    createGrid(items)
  );

  return container;
} 
