export const WorkerRuntime = {

  workers:new Map(),

  create(id, path){

    const worker =
      new Worker(path, {
        type:"module"
      });

    this.workers.set(
      id,
      worker
    );

    return worker;

  },

  terminate(id){

    this.workers
      ?.get(id)
      ?.terminate();

    this.workers.delete(id);

  }

}; 
