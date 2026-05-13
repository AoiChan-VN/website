export const AdvancedGestures = {

  initialize(){

    let startX = 0;

    window.addEventListener(
      "touchstart",
      event => {

        startX =
          event.touches[0].clientX;

      }
    );

    window.addEventListener(
      "touchend",
      event => {

        const endX =
          event.changedTouches[0]
            .clientX;

        const delta =
          endX - startX;

        if(delta > 180){

          console.log(
            "[SPACE] PREVIOUS"
          );

        }

        if(delta < -180){

          console.log(
            "[SPACE] NEXT"
          );

        }

      }
    );

  }

}; 
