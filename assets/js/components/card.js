import { openOverlay }
from "../modules/overlay.js";

import { preloadImage }
from "../modules/preload.js";

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
        alt="${item.title || item.id}"
        loading="lazy"
        decoding="async"
      />

      <div class="card-gradient"></div>

    </div>

    <div class="card-body">

      <div class="card-category">
        ${item.category || "POST"}
      </div>

      <div class="card-top">

        <a
          class="card-route"
          href="#/posts/${item.id}"
        >
          ${item.title || item.id}
        </a>

        <button
          class="card-button"
          type="button"
          aria-label="Open panel"
        >
          +
        </button>

      </div>

      <p class="card-description">
        ${item.description}
      </p>

    </div>
  `;

  article.addEventListener(
    "mouseenter",
    () => {

      preloadImage(
        item.img
      );

    },
    { passive: true }
  );

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
