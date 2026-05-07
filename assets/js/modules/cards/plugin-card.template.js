export function pluginCardTemplate(
  plugin
) {

  return `

    <article
      class="plugin-card"
      id="plugin-card-${plugin.id}"
    >

      <img
        src="${plugin.thumbnail}"
        alt="${plugin.name}"
        class="plugin-card-image"
        loading="lazy"
      />

      <div class="plugin-card-content">

        <span class="plugin-card-version">
          v${plugin.version}
        </span>

        <h2 class="plugin-card-title">
          ${plugin.name}
        </h2>

        <p class="plugin-card-description">
          ${plugin.description}
        </p>

        <div class="plugin-card-tags">

          ${plugin.tags.map(tag => `
            <span class="plugin-tag">
              ${tag}
            </span>
          `).join("")}

        </div>

      </div>

    </article>

  `;

} 
