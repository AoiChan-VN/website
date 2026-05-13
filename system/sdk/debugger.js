export const RuntimeDebugger = {

  logs:[],

  log(...payload){

    this.logs.push({

      timestamp:
        Date.now(),

      payload

    });

  },

  all(){

    return this.logs;

  },

  clear(){

    this.logs.length = 0;

  }

}; 
