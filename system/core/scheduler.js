export const Scheduler = {

  queue:[],

  frame:null,

  schedule(task){

    this.queue.push(task);

    this.request();

  },

  request(){

    if(this.frame){
      return;
    }

    this.frame =
      requestAnimationFrame(
        () => {

          this.flush();

        }
      );

  },

  flush(){

    const jobs =
      [...this.queue];

    this.queue.length = 0;

    for(const job of jobs){

      try{

        job();

      }
      catch(error){

        console.error(
          "[SCHEDULER]",
          error
        );

      }

    }

    this.frame = null;

  }

}; 
