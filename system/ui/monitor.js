export const MultiMonitorRuntime = {

  monitors:[

    {
      id:"primary",

      width:
        window.innerWidth,

      height:
        window.innerHeight
    }

  ],

  primary(){

    return this.monitors[0];

  }

}; 
