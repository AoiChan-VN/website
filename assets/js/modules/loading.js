export function initializeLoading(){

  const screen =
    document.querySelector('.loading-screen');

  if(!screen){
    return;
  }

  window.addEventListener(
    'load',
    () => {

      requestAnimationFrame(() => {

        screen.classList.add(
          'loading-screen-hidden'
        );
      });
    },
    { passive:true, once:true }
  );
} 
