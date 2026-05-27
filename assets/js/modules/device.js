export function isLowEndMobile() {

  const cores =
    navigator.hardwareConcurrency
    || 2;

  const memory =
    navigator.deviceMemory
    || 2;

  const width =
    window.innerWidth;

  const mobile =
    /android|iphone|ipad/i
      .test(
        navigator.userAgent
      );

  return (
    mobile
    && (
      cores <= 4
      || memory <= 4
      || width <= 768
    )
  );

}

export function prefersReducedMotion() {

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

}
