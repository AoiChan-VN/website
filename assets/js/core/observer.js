/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function createRevealObserver() {

  const observer =
    new IntersectionObserver(
      handleReveal,
      {
        threshold: 0.15
      }
    );

  document
    .querySelectorAll("[data-reveal]")
    .forEach(element => {

      observer.observe(element);

    });

}

function handleReveal(entries) {

  entries.forEach(entry => {

    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add(
      "revealed"
    );

  });

} 
