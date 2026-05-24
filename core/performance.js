export function lazyRender(callback) {

  requestAnimationFrame(() => {
    callback();
  });

} 
