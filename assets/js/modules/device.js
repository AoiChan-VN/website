export function isLowEndMobile() {

  const memory =
    navigator.deviceMemory || 4;

  const cores =
    navigator.hardwareConcurrency || 4;

  const width =
    window.innerWidth;

  return (
    memory <= 4
    || cores <= 4
    || width <= 768
  );

} 
