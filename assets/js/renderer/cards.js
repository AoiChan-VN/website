import { openPanel } from "../modules/panel.js";

const container =
  document.getElementById("cards");

function createCard(item) {

  const article =
    document.createElement("article");

  article.className =
    "aoi-card";

  article.innerHTML = `
    <div class="card-cover">

      <img
        class="card-image"
        src="${item.img}"
        alt="${item.id}"
        loading="lazy"
        decoding="async"
      />

    </div>

    <div class="card-body">

      <div class="card-top">

        <h3 class="card-title">
          ${item.id}
        </h3>

        <button
          class="card-action"
          type="button"
        >
          •••
        </button>

      </div>

      <p class="card-description">
        ${item.description}
      </p>

    </div>
  `;

  article
    .querySelector(".card-action")
    .addEventListener(
      "click",
      () => openPanel(item)
    );

  return article;

}

export function renderCards(data) {

  const fragment =
    document.createDocumentFragment();

  data.forEach((item) => {

    fragment.appendChild(
      createCard(item)
    );

  });

  container.appendChild(fragment);

} 
