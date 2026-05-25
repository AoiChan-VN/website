import { createElement }
from "./create-element.js";

import { sanitizeText }
from "./sanitize-text.js";

import { applyImageFallback }
from "./image-fallback.js";

import { createLinkButton }
from "./create-link-button.js";

export function createCard(item) {

  const article =
    createElement(
      "article",
      "portfolio-card glass-card"
    );

  const imageWrapper =
    createElement(
      "div",
      "card-image-wrapper"
    );

  const image =
    createElement(
      "img",
      "card-image"
    );

  image.src = item.img;

  image.alt =
    sanitizeText(item.name);

  image.loading = "lazy";

  image.decoding = "async";

  applyImageFallback(image);

  imageWrapper.appendChild(image);

  const content =
    createElement(
      "div",
      "card-content"
    );

  const title =
    createElement(
      "h3",
      "card-title"
    );

  title.textContent =
    item.name;

  const description =
    createElement(
      "p",
      "card-description"
    );

  description.textContent =
    item.description;

  content.appendChild(title);

  content.appendChild(description);

  const hasLink =
    typeof item.link === "string" &&
    item.link.trim() !== "";

  if (hasLink) {

    const footer =
      createElement(
        "div",
        "card-footer"
      );

    const button =
      createLinkButton(item.link);

    footer.appendChild(button);

    content.appendChild(footer);

  }

  article.appendChild(imageWrapper);

  article.appendChild(content);

  return article;

}
