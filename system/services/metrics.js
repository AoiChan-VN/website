import { ProcessManager }
from "../core/process.js";

export const MetricsService = {

  fps:0,

  initialize(){

    this.measureFPS();

  },

  measureFPS(){

    let last =
      performance.now();

    let frames = 0;

    const loop = now => {

      frames++;

      if(now >= last + 1000){

        this.fps = frames;

        frames = 0;

        last = now;

      }

      requestAnimationFrame(loop);

    };

    requestAnimationFrame(loop);

  },

  memory(){

    if(
      !performance.memory
    ){

      return null;
    }

    return Math.round(
      performance.memory
        .usedJSHeapSize /
      1048576
    );

  },

  processes(){

    return ProcessManager
      .all()
      .length;

  }

}; 
