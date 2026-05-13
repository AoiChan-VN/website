export const SpringMotion = {

  animate(node, properties){

    node.animate(
      properties,
      {
        duration:420,

        easing:
          "cubic-bezier(.2,.8,.2,1)"
      }
    );

  }

}; 
