export function initEffects() {

  document.addEventListener(
    "pointermove",
    (event) => {

      const cards = document.querySelectorAll(
        ".aoi-card"
      );

      cards.forEach((card) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty(
          "--mouse-x",
          `${x}px`
        );

        card.style.setProperty(
          "--mouse-y",
          `${y}px`
        );

      });

    }
  );

} 
