export function isTouchDevice(){

  return (
    window.matchMedia('(pointer:coarse)').matches ||
    navigator.maxTouchPoints > 0
  );
}

export function prefersReducedMotion(){

  return window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
}
