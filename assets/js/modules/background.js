import { isLowEndMobile }
from "./device.js";

export function initBackgroundFX() {

  if (isLowEndMobile()) {

    document.body.classList.add(
      "low-motion"
    );

    return;

  }

  const layer =
    document.querySelector(
      ".bg-gradient"
    );

  let x = 0;
  let y = 0;

  window.addEventListener(
    "pointermove",
    (event) => {

      x =
        (
          event.clientX
          / window.innerWidth
        ) - 0.5;

      y =
        (
          event.clientY
          / window.innerHeight
        ) - 0.5;

    },
    {
      passive: true
    }
  );

  function animate() {

    layer.style.transform =
      `
      translate3d(
        ${x * 16}px,
        ${y * 16}px,
        0
      )
    `;

    requestAnimationFrame(
      animate
    );

  }

  animate();

} 
