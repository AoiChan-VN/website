export const GestureRuntime = {

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

        if(delta > 120){

          console.log(
            "[GESTURE] swipe right"
          );

        }

        if(delta < -120){

          console.log(
            "[GESTURE] swipe left"
          );

        }

      }
    );

  }

}; 
