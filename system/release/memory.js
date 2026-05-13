export const MemoryRuntime = {

  cleanup(){

    if(
      window.gc
    ){

      window.gc();

    }

  },

  release(node){

    if(!node){
      return;
    }

    node.remove();

  }

}; 
