export const ContextMenu = {

  node:null,

  initialize(){

    window.addEventListener(
      "contextmenu",
      event => {

        event.preventDefault();

        this.destroy();

        this.create(
          event.clientX,
          event.clientY
        );

      }
    );

    window.addEventListener(
      "click",
      () => {

        this.destroy();

      }
    );

  },

  create(x, y){

    this.node =
      document.createElement("div");

    this.node.className =
      "system-context-menu";

    this.node.style.left =
      `${x}px`;

    this.node.style.top =
      `${y}px`;

    this.node.innerHTML = `
      <div
        class="context-menu-item"
        data-action="refresh"
      >
        Refresh
      </div>

      <div
        class="context-menu-item"
        data-action="wallpaper"
      >
        Change Wallpaper
      </div>
    `;

    document.body.appendChild(
      this.node
    );

  },

  destroy(){

    this.node?.remove();

  }

}; 
