const FALLBACK =
  "./assets/images/fallback.webp";

export function applyImageFallback() {

  const images =
    document.querySelectorAll(
      "img"
    );

  images.forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.src =
          FALLBACK;

      },
      { once: true }
    );

  });

} 
