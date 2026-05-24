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
