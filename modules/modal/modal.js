export function openModal(content) {

  const root = document.querySelector(
    '#aoi-modal-root'
  );

  root.innerHTML = `
    <div class="aoi-modal-overlay">

      <div class="aoi-modal">

        <button
          class="aoi-modal-close"
        >
          ×
        </button>

        <div class="aoi-modal-content">
          ${content}
        </div>

      </div>

    </div>
  `;

  bindModal();
}

function bindModal() {

  const root =
    document.querySelector('#aoi-modal-root');

  root
    .querySelector('.aoi-modal-close')
    .addEventListener('click', closeModal);

}

export function closeModal() {

  const root =
    document.querySelector('#aoi-modal-root');

  root.innerHTML = '';

} 
