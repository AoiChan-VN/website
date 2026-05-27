const loaded =
  new Set();

export function preloadImage(
  source
) {

  if (
    !source
    || loaded.has(source)
  ) {

    return;

  }

  const image =
    new Image();

  image.src =
    source;

  loaded.add(
    source
  );

}
