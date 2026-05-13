export const CinematicRuntime = {

  flash(node){

    node.animate(

      [
        {
          opacity:.7
        },

        {
          opacity:1
        }

      ],

      {
        duration:220,
        easing:"ease"
      }

    );

  }

}; 
