export const BootProfiler = {

  start:0,

  begin(){

    this.start =
      performance.now();

  },

  end(){

    return (
      performance.now()
      - this.start
    );

  }

}; 
