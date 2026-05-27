import { loadContent }
from "../services/database.js";

import { createCard }
from "../components/card.js";

import { reveal }
from "../modules/reveal.js";

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
    "hero-section reveal-item";

  hero.innerHTML = `
    <div
      class="hero-content"
      data-depth="12"
    >

      <div class="hero-badge">
        IOS • Anime • Huyền Huyễn
      </div>

      <h1 class="hero-title">
        Aoi Interface
      </h1>

      <p class="hero-description">
        Cinematic static architecture
        optimized for GitHub Pages.
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
        class="hero-grid"
        data-depth="8"
      ></div>

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

  reveal([
    hero,
    ...grid.children
  ]);

  initParallax();

  applyImageFallback();

} 
