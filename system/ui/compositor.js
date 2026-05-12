export const Compositor = {

  focus(win){

    const windows =
      document.querySelectorAll(
        ".system-window"
      );

    windows.forEach(
      node => {

        node.classList.remove(
          "focused"
        );

      }
    );

    win.classList.add(
      "focused"
    );

  },

  minimize(win){

    win.classList.add(
      "minimized"
    );

  },

  restore(win){

    win.classList.remove(
      "minimized"
    );

  },

  maximize(win){

    win.classList.toggle(
      "maximized"
    );

  }

}; 
