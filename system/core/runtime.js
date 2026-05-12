export const Runtime = {

  desktop:null,

  windows:null,

  initialize(){

    this.desktop =
      document.getElementById(
        "desktop-layer"
      );

    this.windows =
      document.getElementById(
        "window-layer"
      );

    this.renderDesktop();

  },

  renderDesktop(){

    this.desktop.innerHTML = `
      <div class="desktop-wallpaper"></div>

      <div class="desktop-grid"></div>
    `;

  }

}; 
