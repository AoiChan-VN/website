import { openOverlay }
from "../modules/overlay.js";

import { preloadImage }
from "../modules/preload.js";

import {
  safeText
}
from "../modules/security.js";

export function createCard(item) {

  const title =
    safeText(
      item.title || item.id
    );

  const category =
    safeText(
      item.category || "POST"
    );

  const description =
    safeText(
      item.description
    );

  const article =
    document.createElement(
      "article"
    );

  article.className =
    "content-card reveal-item";

  article.innerHTML = `
    <div class="card-image-wrap">

      <img
        class="card-image"
        src="${item.img}"
        alt="${title}"
        loading="lazy"
        decoding="async"
      />

      <div class="card-gradient"></div>

    </div>

    <div class="card-body">

      <div class="card-category">
        ${category}
      </div>

      <div class="card-top">

        <a
          class="card-route"
          href="#/posts/${item.id}"
        >
          ${title}
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
        ${description}
      </p>

    </div>
  `;

  const desktop =
    window.matchMedia(
      "(hover: hover)"
    ).matches;

  if (desktop) {

    article.addEventListener(
      "mouseenter",
      () => {

        preloadImage(
          item.img
        );

      },
      {
        passive: true
      }
    );

  }

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
