export const Storage = {

  prefix:"nova",

  key(name){

    return `${this.prefix}:${name}`;

  },

  set(name, value){

    localStorage.setItem(
      this.key(name),
      JSON.stringify(value)
    );

  },

  get(name, fallback=null){

    const value =
      localStorage.getItem(
        this.key(name)
      );

    if(!value){
      return fallback;
    }

    return JSON.parse(value);

  },

  remove(name){

    localStorage.removeItem(
      this.key(name)
    );

  }

}; 
