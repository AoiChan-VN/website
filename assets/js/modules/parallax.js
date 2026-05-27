import { isLowEndMobile }
from "./device.js";

let ticking = false;

let currentX = 0;
let currentY = 0;

export function initParallax() {

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

  window.addEventListener(
    "pointermove",
    handleMove,
    {
      passive: true
    }
  );

  function handleMove(event) {

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

      const moveX =
        currentX * depth;

      const moveY =
        currentY * depth;

      layer.style.transform =
        `
        translate3d(
          ${moveX}px,
          ${moveY}px,
          0
        )
      `;

    });

    ticking = false;

  }

} 
