import { createElement }
from "./create-element.js";

export function createLinkButton(link) {

  const button =
    createElement(
      "a",
      "card-button"
    );

  button.href = link;

  button.target = "_blank";

  button.rel =
    "noopener noreferrer";

  button.textContent = "Open";

  return button;

} 
