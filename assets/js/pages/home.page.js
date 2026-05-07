/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { getFeaturedPlugins }
from "../services/plugin.service.js";

import { renderPlugins }
from "../renderers/plugin.renderer.js";

import { renderSearch }
from "../modules/search/search.js";

export async function renderHomePage(
  root
) {

  root.innerHTML = `

    <section class="hero-section">

      <div class="hero-content">

        <span class="hero-badge">
          Minecraft Infrastructure
        </span>

        <h1 class="hero-title">
          AoiChan Portfolio
        </h1>

        <p class="hero-description">
          Advanced Minecraft plugin
          ecosystems and infrastructures.
        </p>

        <div id="search-slot"></div>

      </div>

    </section>

    <section>

      <div
        class="plugin-grid"
        id="plugin-grid"
      ></div>

    </section>

  `;

  renderSearch();

  const plugins =
    await getFeaturedPlugins();

  const target =
    document.getElementById(
      "plugin-grid"
    );

  renderPlugins(
    target,
    plugins
  );

}
