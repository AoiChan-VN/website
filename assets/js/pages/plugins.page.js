/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { getPlugins }
from "../services/plugin.service.js";

import { renderPlugins }
from "../renderers/plugin.renderer.js";

import { renderSearch }
from "../modules/search/search.js";

export async function renderPluginsPage(
  root
) {

  root.innerHTML = `

    <section class="page-hero">

      <div class="page-hero-content">

        <span class="page-label">
          Minecraft Plugins
        </span>

        <h1 class="page-title">
          Plugin Ecosystem
        </h1>

        <p class="page-description">
          Advanced Minecraft server systems.
        </p>

        <div id="search-slot"></div>

      </div>

    </section>

    <section class="plugins-wrapper">

      <div
        class="plugin-grid"
        id="plugins-grid"
      ></div>

    </section>

  `;

  renderSearch();

  const plugins =
    await getPlugins();

  const target =
    document.getElementById(
      "plugins-grid"
    );

  renderPlugins(
    target,
    plugins
  );

}
