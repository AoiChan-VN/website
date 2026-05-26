const overlay =
  document.getElementById(
    "overlay-panel"
  );

const content =
  document.getElementById(
    "overlay-content"
  );

const close =
  document.getElementById(
    "overlay-close"
  );

export function initOverlay() {

  close.addEventListener(
    "click",
    closeOverlay
  );

  overlay.addEventListener(
    "click",
    (event) => {

      if (event.target === overlay) {
        closeOverlay();
      }

    }
  );

}

export function openOverlay(data) {

  content.innerHTML = `
    <div class="overlay-card">

      <img
        class="overlay-image"
        src="${data.img}"
        alt="${data.id}"
      />

      <h2 class="overlay-title">
        ${data.id}
      </h2>

      <p class="overlay-description">
        ${data.description}
      </p>

      ${
        data.link
          ? `
            <a
              class="overlay-link"
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

  overlay.classList.remove(
    "hidden"
  );

}

export function closeOverlay() {

  overlay.classList.add(
    "hidden"
  );

} 
