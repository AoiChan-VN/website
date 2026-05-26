export function initLazyObserver() {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.1
      }
    );

  document
    .querySelectorAll(
      ".observe"
    )
    .forEach((element) => {

      observer.observe(
        element
      );

    });

} 
