export const PhysicsRuntime = {

  momentum({

    node,

    velocityX,

    velocityY

  }){

    node.animate(

      [
        {
          transform:
            "translate(0,0)"
        },

        {
          transform:
            `
              translate(
                ${velocityX * 20}px,
                ${velocityY * 20}px
              )
            `
        }

      ],

      {
        duration:400,
        easing:"ease-out"
      }

    );

  }

}; 
