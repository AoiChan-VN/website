const panel = document.getElementById(
  "floating-panel"
);

const panelBody = document.getElementById(
  "panel-body"
);

const closeButton = document.getElementById(
  "panel-close"
);

export function initPanel() {

  closeButton.addEventListener(
    "click",
    closePanel
  );

  panel.addEventListener(
    "click",
    (event) => {

      if (event.target === panel) {
        closePanel();
      }

    }
  );

}

export function openPanel(data) {

  panelBody.innerHTML = `
    <div class="panel-card">

      <img
        class="panel-image"
        src="${data.img}"
        alt="${data.id}"
      />

      <h2 class="panel-title">
        ${data.id}
      </h2>

      <p class="panel-description">
        ${data.description}
      </p>

      ${
        data.link
          ? `
            <a
              class="panel-link"
              href="${data.link}"
              target="_blank"
              rel="noopener noreferrer"
            >
              OPEN LINK
            </a>
          `
          : ""
      }

    </div>
  `;

  panel.classList.remove("hidden");

}

export function closePanel() {

  panel.classList.add("hidden");

} 
