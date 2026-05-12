export const ProcessManager = {

  processes:new Map(),

  create({
    pid,
    app,
    window
  }){

    this.processes.set(
      pid,
      {
        pid,
        app,
        window,
        createdAt:Date.now()
      }
    );

  },

  remove(pid){

    this.processes.delete(pid);

  },

  all(){

    return [
      ...this.processes.values()
    ];

  }

}; 
