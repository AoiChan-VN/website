const layers = document.querySelectorAll(
  ".parallax-layer"
);

export function initParallax() {

  window.addEventListener(
    "mousemove",
    (event) => {

      const x = (
        event.clientX / window.innerWidth
      ) - 0.5;

      const y = (
        event.clientY / window.innerHeight
      ) - 0.5;

      layers.forEach((layer, index) => {

        const depth = (index + 1) * 18;

        layer.style.transform = `
          translate3d(
            ${x * depth}px,
            ${y * depth}px,
            0
          )
        `;

      });

    }
  );

} 
