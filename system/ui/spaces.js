export const SpacesRuntime = {

  spaces:[],

  active:0,

  create(){

    const space =
      document.createElement("div");

    space.className =
      "desktop-space";

    document.body.appendChild(
      space
    );

    this.spaces.push(space);

    return space;

  },

  switch(index){

    this.active = index;

    this.spaces.forEach(
      (
        space,
        i
      ) => {

        space.classList.toggle(
          "hidden",
          i !== index
        );

      }
    );

  }

}; 
