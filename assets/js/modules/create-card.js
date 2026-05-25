import { applyImageFallback }
from "./image-fallback.js";

export function createCard(item) {

  const article =
    document.createElement("article");

  article.className =
    "portfolio-card glass-card";

  const hasLink =
    typeof item.link === "string" &&
    item.link.trim() !== "";

  article.innerHTML = `
    <div class="card-image-wrapper">

      <img
        src="${item.img}"
        alt="${item.name}"
        class="card-image"
        loading="lazy"
        decoding="async"
      />

    </div>

    <div class="card-content">

      <h3 class="card-title">
        ${item.name}
      </h3>

      <p class="card-description">
        ${item.description}
      </p>

      ${
        hasLink
          ? `
            <div class="card-footer">

              <a
                href="${item.link}"
                class="card-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
              </a>

            </div>
          `
          : ""
      }

    </div>
  `;

  const image =
    article.querySelector(".card-image");

  applyImageFallback(image);

  return article;

}
