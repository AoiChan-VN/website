let lastTime = performance.now();

let lowFpsFrames = 0;

export function initializeFpsManager(){

  function measure(now){

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

      document.documentElement.classList.add(
        'low-performance'
      );

      return;
    }

    requestAnimationFrame(measure);
  }

  requestAnimationFrame(measure);
} 
