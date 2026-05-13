export const SyncRuntime = {

  async push(payload){

    const serialized =
      JSON.stringify(payload);

    localStorage.setItem(
      "nova-cloud-sync",
      serialized
    );

    return true;

  },

  async pull(){

    const raw =
      localStorage.getItem(
        "nova-cloud-sync"
      );

    if(!raw){
      return null;
    }

    return JSON.parse(raw);

  }

}; 
