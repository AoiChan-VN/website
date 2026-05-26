import { openOverlay } from "../modules/overlay.js";

export function createCard(item) {

  const article =
    document.createElement("article");

  article.className =
    "content-card";

  article.innerHTML = `
    <div class="card-image-wrap">

      <img
        class="card-image"
        src="${item.img}"
        alt="${item.id}"
        loading="lazy"
        decoding="async"
      />

    </div>

    <div class="card-body">

      <div class="card-top">

        <h2 class="card-title">
          ${item.id}
        </h2>

        <button
          class="card-button"
          type="button"
        >
          +
        </button>

      </div>

      <p class="card-description">
        ${item.description}
      </p>

    </div>
  `;

  article
    .querySelector(".card-button")
    .addEventListener(
      "click",
      () => {

        openOverlay(item);

      }
    );

  return article;

} 
