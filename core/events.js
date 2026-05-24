export function delegate(parent, selector, type, handler) {
  parent.addEventListener(type, (event) => {
    const target = event.target.closest(selector);

    if (!target) return;

    handler(event, target);
  });
} 
