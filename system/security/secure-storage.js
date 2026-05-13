export const SecureStorage = {

  namespace:"nova-secure",

  buildKey(key){

    return `${this.namespace}:${key}`;
  },

  set(key, value){

    localStorage.setItem(
      this.buildKey(key),
      JSON.stringify(value)
    );

  },

  get(key, fallback=null){

    const raw =
      localStorage.getItem(
        this.buildKey(key)
      );

    if(!raw){
      return fallback;
    }

    return JSON.parse(raw);

  },

  remove(key){

    localStorage.removeItem(
      this.buildKey(key)
    );

  }

}; 
