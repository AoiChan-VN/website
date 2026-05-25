export function createCard(item) {

  const article = document.createElement("article");

  article.className =
    "portfolio-card glass-card";

  article.innerHTML = `
    <div class="card-image-wrapper">
      <img
        src="${item.img}"
        alt="${item.name}"
        class="card-image"
        loading="lazy"
      />
    </div>

    <div class="card-content">

      <h3 class="card-title">
        ${item.name}
      </h3>

      <p class="card-description">
        ${item.description}
      </p>

      <div class="card-footer">

        ${
          item.link
            ? `
              <a
                href="${item.link}"
                class="card-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
              </a>
            `
            : ""
        }

      </div>

    </div>
  `;

  return article;
} 
