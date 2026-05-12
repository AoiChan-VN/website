export const AnimationEngine = {

  fadeIn(node){

    node.animate(
      [
        {
          opacity:0
        },
        {
          opacity:1
        }
      ],
      {
        duration:180,
        easing:"ease"
      }
    );

  },

  scaleIn(node){

    node.animate(
      [
        {
          opacity:0,
          transform:"scale(.94)"
        },
        {
          opacity:1,
          transform:"scale(1)"
        }
      ],
      {
        duration:220,
        easing:"ease"
      }
    );

  }

}; 
