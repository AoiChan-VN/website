export const AdvancedCompositor = {

  elevate(win){

    win.style.transform =
      `
        translateZ(40px)
        scale(1.01)
      `;
  },

  normalize(win){

    win.style.transform =
      "";

  },

  cinematicOpen(win){

    win.classList.add(
      "opening"
    );

    setTimeout(
      () => {

        win.classList.remove(
          "opening"
        );

      },
      300
    );

  },

  cinematicClose(win){

    win.classList.add(
      "closing"
    );

    setTimeout(
      () => {

        win.remove();

      },
      180
    );

  }

}; 
