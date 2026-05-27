let previous = 0;

export function initScrollEffects() {

  const topbar =
    document.querySelector(
      ".topbar"
    );

  const sidebar =
    document.querySelector(
      ".sidebar"
    );

  if (!topbar || !sidebar) {
    return;
  }

  window.addEventListener(
    "scroll",
    () => {

      const current =
        window.scrollY;

      if (current > 24) {

        topbar.classList.add(
          "topbar-scrolled"
        );

        sidebar.classList.add(
          "sidebar-scrolled"
        );

      } else {

        topbar.classList.remove(
          "topbar-scrolled"
        );

        sidebar.classList.remove(
          "sidebar-scrolled"
        );

      }

      if (current > previous) {

        topbar.classList.add(
          "topbar-hidden"
        );

      } else {

        topbar.classList.remove(
          "topbar-hidden"
        );

      }

      previous = current;

    },
    {
      passive: true
    }
  );

} 
