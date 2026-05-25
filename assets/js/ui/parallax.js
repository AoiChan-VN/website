export function initializeParallax() {

  const layers =
    document.querySelectorAll(
      ".parallax-layer"
    );

  window.addEventListener(
    "mousemove",
    (event) => {

      const x =
        event.clientX / window.innerWidth;

      const y =
        event.clientY / window.innerHeight;

      layers.forEach((layer) => {

        const speed =
          Number(
            layer.dataset.speed
          );

        const moveX =
          (x - 0.5) * speed * 100;

        const moveY =
          (y - 0.5) * speed * 100;

        layer.style.transform =
          `translate(${moveX}px, ${moveY}px)`;
      });

    }
  );

} 
