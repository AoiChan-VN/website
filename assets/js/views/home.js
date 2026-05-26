import { loadContent }
from "../services/database.js";

import { createCard }
from "../components/card.js";

import { initLazyObserver }
from "../modules/lazy-observer.js";

import { applyImageFallback }
from "../modules/image-fallback.js";

export async function renderHome(
  root
) {

  const content =
    await loadContent();

  const hero =
    document.createElement(
      "section"
    );

  hero.className =
    "hero-section observe";

  hero.innerHTML = `
    <div class="hero-content">

      <div class="hero-badge">
        IOS • Anime • 3D
      </div>

      <h1 class="hero-title">
        Aoi Interface
      </h1>

      <p class="hero-description">
        Production-grade static architecture.
      </p>

    </div>

    <div class="hero-visual">

      <div class="hero-orb"></div>

    </div>
  `;

  const grid =
    document.createElement(
      "section"
    );

  grid.className =
    "content-grid";

  const fragment =
    document.createDocumentFragment();

  content.forEach((item) => {

    fragment.appendChild(
      createCard(item)
    );

  });

  grid.appendChild(fragment);

  root.appendChild(hero);
  root.appendChild(grid);

  initLazyObserver();

  applyImageFallback();

}
