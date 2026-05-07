/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function initializeLazyImages() {

  const images =
    document.querySelectorAll(
      "img[data-src]"
    );

  const observer =
    new IntersectionObserver(
      handleIntersection,
      {
        rootMargin: "100px"
      }
    );

  images.forEach(image => {

    observer.observe(image);

  });

}

function handleIntersection(
  entries,
  observer
) {

  entries.forEach(entry => {

    if (!entry.isIntersecting) {
      return;
    }

    const image =
      entry.target;

    const source =
      image.dataset.src;

    image.src =
      source;

    image.removeAttribute(
      "data-src"
    );

    image.classList.add(
      "lazy-loaded"
    );

    observer.unobserve(image);

  });

} 
