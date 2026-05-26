import { openOverlay }
from "../modules/overlay.js";

export function createCard(item) {

  const article =
    document.createElement(
      "article"
    );

  article.className =
    "content-card observe";

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

        <a
          class="card-route"
          href="#/posts/${item.id}"
        >
          ${item.id}
        </a>

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
    .querySelector(
      ".card-button"
    )
    .addEventListener(
      "click",
      () => {

        openOverlay(item);

      }
    );

  return article;

}
