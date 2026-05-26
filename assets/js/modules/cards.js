import { openPanel } from "./panel.js";

export function createCard(data) {

  const card = document.createElement("article");

  card.className = "aoi-card";

  card.innerHTML = `
    <div class="card-image-wrapper">

      <img
        class="card-image"
        src="${data.img}"
        alt="${data.id}"
      />

      <div class="card-overlay"></div>

    </div>

    <div class="card-content">

      <div class="card-header">

        <h2 class="card-title">
          ${data.id}
        </h2>

        <button
          class="card-menu-button"
          type="button"
        >
          •••
        </button>

      </div>

      <p class="card-description">
        ${data.description}
      </p>

    </div>
  `;

  const menuButton = card.querySelector(
    ".card-menu-button"
  );

  menuButton.addEventListener(
    "click",
    () => {

      openPanel(data);

    }
  );

  return card;

} 
