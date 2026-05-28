import {
  updateSceneState
} from './state.js';

let lastTime = performance.now();

let lowFpsFrames = 0;

let degraded = false;

export function initializeFpsManager(){

  function measure(now){

    if(degraded){
      return;
    }

    const delta =
      now - lastTime;

    lastTime = now;

    const fps =
      1000 / delta;

    if(fps < 42){

      lowFpsFrames += 1;

    }else{

      lowFpsFrames = 0;
    }

    if(lowFpsFrames > 40){

      degraded = true;

      document.documentElement.classList.add(
        'low-performance'
      );

      updateSceneState(
        'lowPerformance',
        true
      );

      return;
    }

    requestAnimationFrame(measure);
  }

  requestAnimationFrame(measure);
}
