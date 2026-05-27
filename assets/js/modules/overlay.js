import {
  safeText,
  safeURL
}
from "./security.js";

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

      if (
        event.target === overlay
      ) {

        closeOverlay();

      }

    }
  );

  window.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        closeOverlay();

      }

    }
  );

}

export function openOverlay(
  data
) {

  const title =
    safeText(
      data.title || data.id
    );

  const description =
    safeText(
      data.description
    );

  const link =
    safeURL(data.link);

  content.innerHTML = `
    <div class="overlay-card">

      <img
        class="overlay-image"
        src="${data.img}"
        alt="${title}"
      />

      <h2 class="overlay-title">
        ${title}
      </h2>

      <p class="overlay-description">
        ${description}
      </p>

      ${
        link
          ? `
          <a
            class="overlay-link"
            href="${link}"
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

  document.body.style.overflow =
    "hidden";

}

export function closeOverlay() {

  overlay.classList.add(
    "hidden"
  );

  document.body.style.overflow =
    "";

}
