import {
  isLowEndMobile,
  prefersReducedMotion
}
from "./device.js";

export function initMotion() {

  const root =
    document.documentElement;

  if (
    prefersReducedMotion()
  ) {

    root.classList.add(
      "reduce-motion"
    );

  }

  if (
    isLowEndMobile()
  ) {

    root.classList.add(
      "low-end-device"
    );

  }

}
