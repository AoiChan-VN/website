export function preloadImage(src) {

  return new Promise((resolve, reject) => {

    const image = new Image();

    image.src = src;

    image.onload = () => {
      resolve(src);
    };

    image.onerror = () => {
      reject(src);
    };

  });

} 
