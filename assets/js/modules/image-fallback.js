export function applyImageFallback(imageElement) {

  imageElement.addEventListener("error", () => {

    imageElement.src =
      "./assets/images/fallback.webp";

    imageElement.classList.add(
      "card-image-fallback"
    );

  });

} 
