export const InstallRuntime = {

  deferred:null,

  initialize(){

    window.addEventListener(
      "beforeinstallprompt",
      event => {

        event.preventDefault();

        this.deferred = event;

      }
    );

  },

  async install(){

    if(
      !this.deferred
    ){
      return false;
    }

    this.deferred.prompt();

    const result =
      await this.deferred.userChoice;

    return (
      result.outcome ===
      "accepted"
    );

  }

}; 
