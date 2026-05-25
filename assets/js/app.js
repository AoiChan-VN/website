document.addEventListener(
  "DOMContentLoaded",
  async () => {

    try{

      const items =
        await loadData();

      renderCards(items);

    }catch(error){

      console.error(error);

    }

  }
); 
