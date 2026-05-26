export function createCard(item) {

  const article =
    document.createElement("article");

  article.className = "aoi-card";

  article.innerHTML = `
    <div class="card-image">
      <img
        data-src="${item.img}"
        alt="${item.name}"
        loading="lazy"
      />
    </div>

    <div class="card-content">

      <h2 class="card-title">
        ${item.name}
      </h2>

      <p class="card-description">
        ${item.description}
      </p>

      <div class="card-actions">

        <button
          class="action-button"
          data-action="panel"
          type="button"
        >
          •••
        </button>

      </div>

    </div>
  `;

  return article;
}
