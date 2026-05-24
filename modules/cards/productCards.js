import { openModal } from '../modal/modal.js';
import { loadMarkdown } from '../viewer/markdown.js';

export function renderProductCards(
  target,
  data
) {

  target.innerHTML = '';

  data.forEach((item) => {

    const card =
      document.createElement('article');

    card.className =
      'aoi-card';

    card.innerHTML = `
      <div class="aoi-card-image">

        <img
          src="${item.img}"
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
          data-file="${item.file}"
          data-download="${item.download}"
          data-link="${item.link}"
        >
          ...
        </button>

      </div>
    `;

    target.appendChild(card);

  });

  bindProductEvents();
}

function bindProductEvents() {

  document
    .querySelectorAll('.aoi-card-action')
    .forEach((button) => {

      button.addEventListener(
        'click',
        async () => {

          const markdown =
            await loadMarkdown(
              button.dataset.file
            );

          openModal(`
            <div class="aoi-preview">

              <div class="aoi-preview-actions">

                <a
                  href="${button.dataset.download}"
                  download
                >
                  Download
                </a>

                <a
                  href="${button.dataset.link}"
                  target="_blank"
                >
                  Website
                </a>

              </div>

              <pre class="aoi-markdown">
${markdown}
              </pre>

            </div>
          `);

        }
      );

    });

} 
