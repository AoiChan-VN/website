export function preloadImage(src) {

  if (!src) {
    return;
  }

  const image =
    new Image();

  image.decoding =
    "async";

  image.loading =
    "eager";

  image.src = src;

} 
