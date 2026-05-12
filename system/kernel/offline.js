export const OfflineKernel = {

  async initialize(){

    if(
      !("serviceWorker" in navigator)
    ){

      return;
    }

    await navigator
      .serviceWorker
      .register(
        "./system/kernel/service-worker.js"
      );

    console.log(
      "[OFFLINE KERNEL READY]"
    );

  }

}; 
