export function renderLayout(app) {

  app.innerHTML = `
    <main class="aoi-shell">

      <header class="aoi-header">
        <div class="aoi-logo">
          AOI CORE
        </div>
      </header>

      <section
        id="aoi-content"
        class="aoi-content"
      ></section>

      <div
        id="aoi-panel-root"
        class="aoi-panel-root"
      ></div>

      <div
        id="aoi-modal-root"
        class="aoi-modal-root"
      ></div>

    </main>
  `;
} 
