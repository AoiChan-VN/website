export const TagEngine = {

  map:new Map(),

  add(tag, document){

    if(
      !this.map.has(tag)
    ){

      this.map.set(
        tag,
        []
      );

    }

    this.map
      .get(tag)
      .push(document);

  },

  get(tag){

    return this.map.get(tag)
      || [];
  }

}; 
