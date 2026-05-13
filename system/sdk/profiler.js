export const RuntimeProfiler = {

  measure(task){

    const start =
      performance.now();

    const result =
      task();

    const end =
      performance.now();

    return {

      duration:
        end - start,

      result

    };

  }

}; 
