import { bootstrap }
from "./core/bootstrap.js";

window.addEventListener(
  "DOMContentLoaded",
  async () => {

    try{

      await bootstrap();

    }catch(error){

      console.error(error);

    }

  }
); 
