const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          "revealed"
        );

        observer.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.08
    }
  );

export function reveal(
  elements
) {

  elements.forEach((element) => {

    observer.observe(
      element
    );

  });

} 
