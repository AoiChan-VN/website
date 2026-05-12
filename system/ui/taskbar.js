export const Taskbar = {

  initialize(){

    const shell =
      document.getElementById(
        "system-shell"
      );

    const bar =
      document.createElement("div");

    bar.className =
      "system-taskbar";

    bar.innerHTML = `
      <div class="taskbar-left">

        <div class="taskbar-brand">
          NOVA OS
        </div>

      </div>

      <div class="taskbar-right">

        <div class="taskbar-clock">
          --:--
        </div>

      </div>
    `;

    shell.appendChild(bar);

    this.startClock(bar);

  },

  startClock(bar){

    const clock =
      bar.querySelector(
        ".taskbar-clock"
      );

    const update = () => {

      const now =
        new Date();

      clock.textContent =
        now.toLocaleTimeString(
          [],
          {
            hour:"2-digit",
            minute:"2-digit"
          }
        );

    };

    update();

    setInterval(update, 1000);

  }

}; 
