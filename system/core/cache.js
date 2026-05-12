export const Cache = {

  store:new Map(),

  set(key, value){

    this.store.set(
      key,
      {
        value,
        createdAt:Date.now()
      }
    );

  },

  get(key){

    const item =
      this.store.get(key);

    if(!item){
      return null;
    }

    return item.value;

  },

  has(key){

    return this.store.has(key);

  },

  remove(key){

    this.store.delete(key);

  },

  clear(){

    this.store.clear();

  }

}; 
