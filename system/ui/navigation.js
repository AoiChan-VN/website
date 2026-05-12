export const KeyboardNavigation = {

  initialize(){

    window.addEventListener(
      "keydown",
      event => {

        if(
          event.altKey &&
          event.key === "Tab"
        ){

          event.preventDefault();

          this.nextWindow();

        }

      }
    );

  },

  nextWindow(){

    const windows =
      [
        ...document.querySelectorAll(
          ".system-window"
        )
      ];

    if(!windows.length){
      return;
    }

    const focused =
      document.querySelector(
        ".system-window.focused"
      );

    let index =
      windows.indexOf(focused);

    index++;

    if(index >= windows.length){
      index = 0;
    }

    windows.forEach(
      win => {

        win.classList.remove(
          "focused"
        );

      }
    );

    windows[index].classList.add(
      "focused"
    );

  }

}; 
