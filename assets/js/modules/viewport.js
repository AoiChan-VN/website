let initialized = false;

export function initializeViewport(){

  if(initialized){
    return;
  }

  initialized = true;

  const updateViewport = () => {

    const vh =
      window.innerHeight * 0.01;

    document.documentElement.style.setProperty(
      '--vh',
      `${vh}px`
    );
  };

  updateViewport();

  window.addEventListener(
    'resize',
    updateViewport,
    { passive:true }
  );

  window.addEventListener(
    'orientationchange',
    updateViewport,
    { passive:true }
  );
}
