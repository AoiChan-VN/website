export const RuntimeOptimizer = {

  frame(task){

    requestAnimationFrame(
      () => {

        task();

      }
    );

  },

  idle(task){

    requestIdleCallback(
      () => {

        task();

      }
    );

  }

}; 
