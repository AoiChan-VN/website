import { openCardPanel } from '../panels/panel.js';

export function renderCards(target, data) {

  target.innerHTML = '';

  data.forEach((item) => {

    const card = document.createElement('article');

    card.className = 'aoi-card';

    card.innerHTML = `
      <div class="aoi-card-image">
        <img
          src="${item.icon}"
          alt="${item.name}"
          loading="lazy"
        />
      </div>

      <div class="aoi-card-body">

        <div class="aoi-card-title">
          ${item.name}
        </div>

        <button
          class="aoi-card-action"
          data-folder="${item.folder}"
        >
          +
        </button>

      </div>
    `;

    target.appendChild(card);
  });

  bindCardEvents();
}

function bindCardEvents() {

  document
    .querySelectorAll('.aoi-card-action')
    .forEach((button) => {

      button.addEventListener('click', () => {

        openCardPanel({
          folder: button.dataset.folder
        });

      });

    });

} 
