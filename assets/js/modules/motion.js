const button =
  document.getElementById(
    "motion-toggle"
  );

export function initMotion() {

  const reduced =
    localStorage.getItem(
      "aoi-motion"
    ) === "off";

  if (reduced) {

    document.body.classList.add(
      "reduce-motion"
    );

  }

  button.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "reduce-motion"
      );

      const disabled =
        document.body.classList.contains(
          "reduce-motion"
        );

      localStorage.setItem(
        "aoi-motion",
        disabled
          ? "off"
          : "on"
      );

    }
  );

} 
