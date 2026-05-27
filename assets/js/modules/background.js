export function initBackgroundFX() {

  const root =
    document.documentElement;

  const update =
    () => {

      const y =
        window.scrollY * 0.02;

      root.style.setProperty(
        "--background-shift",
        `${y}px`
      );

    };

  update();

  window.addEventListener(
    "scroll",
    update,
    {
      passive: true
    }
  );

}
