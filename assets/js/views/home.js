import { loadContent }
from "../services/database.js";

import { createCard }
from "../components/card.js";

import { initLazyObserver }
from "../modules/lazy-observer.js";

import { applyImageFallback }
from "../modules/image-fallback.js";

import { initParallax }
from "../modules/parallax.js";

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
    <div
      class="hero-content"
      data-depth="12"
    >

      <div class="hero-badge">
        IOS • Anime • 3D
      </div>

      <h1 class="hero-title">
        Aoi Interface
      </h1>

      <p class="hero-description">
        Cinematic static architecture
        for GitHub deployment.
      </p>

      <div class="hero-actions">

        <a
          href="#/posts"
          class="hero-button"
        >
          Explore
        </a>

      </div>

    </div>

    <div class="hero-visual">

      <div
        class="hero-ring"
        data-depth="24"
      ></div>

      <div
        class="hero-orb"
        data-depth="48"
      ></div>

      <div
        class="hero-glow"
        data-depth="72"
      ></div>

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

  initParallax();

  initLazyObserver();

  applyImageFallback();

}
