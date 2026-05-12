export const PowerService = {

  mode:"balanced",

  set(mode){

    this.mode = mode;

    document.body.dataset.power =
      mode;

    console.log(
      "[POWER MODE]",
      mode
    );

  }

}; 
