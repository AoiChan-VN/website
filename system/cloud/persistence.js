export const PersistenceRuntime = {

  save(key, value){

    localStorage.setItem(
      `nova:persist:${key}`,
      JSON.stringify(value)
    );

  },

  load(key, fallback=null){

    const raw =
      localStorage.getItem(
        `nova:persist:${key}`
      );

    if(!raw){
      return fallback;
    }

    return JSON.parse(raw);

  }

}; 
