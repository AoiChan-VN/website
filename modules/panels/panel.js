import { resolveFolderData } from '../../core/resolver.js';

import { renderProductCards } from '../cards/productCards.js';

import { pushState } from '../../core/navigation.js';

export async function openCardPanel(data) {

  const products =
    await resolveFolderData(data.folder);

  pushState({
    type: 'category',
    folder: data.folder
  });

  renderProductCards(
    document.querySelector(
      '#aoi-content'
    ),
    products
  );

}

export function openCardPanel(data) {

  const root = document.querySelector(
    '#aoi-panel-root'
  );

  root.innerHTML = `
    <div class="aoi-panel">

      <button class="aoi-panel-btn">
        Download
      </button>

      <button class="aoi-panel-btn">
        Information
      </button>

      <button class="aoi-panel-btn">
        Preview
      </button>

      <button class="aoi-panel-close">
        Close
      </button>

    </div>
  `;

  root.classList.add('active');

  root
    .querySelector('.aoi-panel-close')
    .addEventListener('click', () => {

      root.classList.remove('active');
      root.innerHTML = '';

    });

} 
