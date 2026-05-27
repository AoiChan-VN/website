import { isLowEndMobile }
from "./device.js";

import { createFrameLimiter }
from "./performance.js";

let initialized =
  false;

let ticking =
  false;

let currentX =
  0;

let currentY =
  0;

export function initParallax() {

  if (initialized) {
    return;
  }

  initialized = true;

  if (isLowEndMobile()) {
    return;
  }

  const layers =
    document.querySelectorAll(
      "[data-depth]"
    );

  if (!layers.length) {
    return;
  }

  const handleMove =
    createFrameLimiter(
      updatePointer,
      48
    );

  window.addEventListener(
    "pointermove",
    handleMove,
    {
      passive: true
    }
  );

  function updatePointer(
    event
  ) {

    currentX =
      (
        event.clientX
        / window.innerWidth
      ) - 0.5;

    currentY =
      (
        event.clientY
        / window.innerHeight
      ) - 0.5;

    if (ticking) {
      return;
    }

    ticking = true;

    requestAnimationFrame(update);

  }

  function update() {

    layers.forEach((layer) => {

      const depth =
        Number(
          layer.dataset.depth
        ) || 0;

      layer.style.transform =
        `
        translate3d(
          ${currentX * depth}px,
          ${currentY * depth}px,
          0
        )
      `;

    });

    ticking = false;

  }

}
