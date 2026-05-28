import {
  updateSceneState
} from '../core/state.js';

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

        updateSceneState(
          'loaded',
          true
        );
      });
    },
    {
      passive:true,
      once:true
    }
  );
}
