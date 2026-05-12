export const WorkspaceManager = {

  current:0,

  workspaces:[
    []
  ],

  switch(index){

    this.current = index;

    const windows =
      document.querySelectorAll(
        ".system-window"
      );

    windows.forEach(
      win => {

        const workspace =
          Number(
            win.dataset.workspace || 0
          );

        win.style.display =
          workspace === index
            ? "flex"
            : "none";

      }
    );

  }

}; 
