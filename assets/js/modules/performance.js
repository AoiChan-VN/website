let frame = 0;

export function createFrameLimiter(
  callback,
  fps = 60
) {

  const delay =
    1000 / fps;

  return function (...args) {

    const now =
      performance.now();

    if (now - frame < delay) {
      return;
    }

    frame = now;

    callback(...args);

  };

} 
