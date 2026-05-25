import { fetchJson }
from "./fetch-json.js";

import { createCard }
from "./create-card.js";

import { renderLoading }
from "./render-loading.js";

import { renderEmpty }
from "./render-empty.js";

import { renderError }
from "./render-error.js";

import { validateItem }
from "./validate-item.js";

import { preloadImage }
from "./preload-image.js";

export async function loadPortfolio() {

  const container =
    document.getElementById(
      "portfolio-grid"
    );

  if (!container) {
    return;
  }

  renderLoading(container);

  try {

    const folders =
      await fetchJson(
        "./data/aoi-file.json"
      );

    if (
      !Array.isArray(folders) ||
      folders.length === 0
    ) {

      renderEmpty(container);

      return;

    }

    container.innerHTML = "";

    const fragment =
      document.createDocumentFragment();

    let totalItems = 0;

    for (const folder of folders) {

      if (
        !folder ||
        typeof folder.file !== "string"
      ) {
        continue;
      }

      const items =
        await fetchJson(folder.file);

      if (!Array.isArray(items)) {
        continue;
      }

      for (const item of items) {

        const isValid =
          validateItem(item);

        if (!isValid) {
          continue;
        }

        try {

          await preloadImage(
            item.img
          );

        } catch {

          console.warn(
            `Image preload failed: ${item.img}`
          );

        }

        const card =
          createCard(item);

        fragment.appendChild(card);

        totalItems++;

      }

    }

    container.appendChild(fragment);

    if (totalItems === 0) {
      renderEmpty(container);
    }

  } catch (error) {

    console.error(
      "Portfolio Load Failed:",
      error
    );

    renderError(container);

  }

} 
