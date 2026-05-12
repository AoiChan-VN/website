export const Router = {

  initialize(){

    window.addEventListener(
      "hashchange",
      () => {

        this.resolve();

      }
    );

    this.resolve();

  },

  resolve(){

    const hash =
      location.hash || "#/";

    console.log(
      "[ROUTE]",
      hash
    );

  },

  navigate(path){

    location.hash = path;

  }

}; 
