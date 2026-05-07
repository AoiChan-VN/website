/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { getPlugins }
from "../services/plugin.service.js";

import { renderPlugins }
from "../renderers/plugin.renderer.js";

export function renderPluginsPage(
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
          High performance Minecraft
          infrastructures and systems.
        </p>

      </div>

    </section>

    <section class="plugins-wrapper">

      <div
        class="plugin-grid"
        id="plugins-grid"
      ></div>

    </section>

  `;

  const plugins =
    getPlugins();

  const target =
    document.getElementById(
      "plugins-grid"
    );

  renderPlugins(
    target,
    plugins
  );

} 
