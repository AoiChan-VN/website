import { pluginsDatabase }
from "../database/plugins.db.js";

export function renderHomePage(root) {

  root.innerHTML = `

    <section class="hero-section">

      <div class="hero-content">

        <span class="hero-badge">
          Minecraft Developer
        </span>

        <h1 class="hero-title">
          AoiChan Portfolio
        </h1>

        <p class="hero-description">
          High performance Minecraft systems,
          plugins and infrastructures.
        </p>

      </div>

    </section>

    <section class="plugin-grid" id="plugin-grid"></section>

  `;

  const grid =
    document.getElementById("plugin-grid");

  pluginsDatabase.forEach(plugin => {

    grid.innerHTML += `

      <article
        class="plugin-card"
        id="plugin-card-${plugin.id}"
      >

        <img
          src="${plugin.thumbnail}"
          alt="${plugin.name}"
          class="plugin-card-image"
        />

        <div class="plugin-card-content">

          <h2 class="plugin-card-title">
            ${plugin.name}
          </h2>

          <p class="plugin-card-description">
            ${plugin.description}
          </p>

        </div>

      </article>

    `;

  });

} 
