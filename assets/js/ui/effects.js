export function initializeCardEffects() {

  const cards =
    document.querySelectorAll(
      ".aoi-card"
    );

  cards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateY =
          ((x / rect.width) - 0.5) * 14;

        const rotateX =
          ((y / rect.height) - 0.5) * -14;

        card.style.transform = `
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-8px)
        `;

        card.style.setProperty(
          "--glow-x",
          `${x}px`
        );

        card.style.setProperty(
          "--glow-y",
          `${y}px`
        );

      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = `
          perspective(1200px)
          rotateX(0deg)
          rotateY(0deg)
          translateY(0px)
        `;

      }
    );

  });

} 
