export const RuntimeCache = {

  map:new Map(),

  set(key, value){

    this.map.set(
      key,
      value
    );

  },

  get(key){

    return this.map.get(key);

  },

  has(key){

    return this.map.has(key);

  },

  clear(){

    this.map.clear();

  }

}; 
