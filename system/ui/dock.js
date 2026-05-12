import { Mount } from "../boot/mount.js";

export const Dock = {

  render(container){

    container.innerHTML = `
      <div
        class="dock-item"
        data-app="profile"
      >
        <img
          src="./assets/icons/profile.png"
          alt="profile"
        >
      </div>

      <div
        class="dock-item"
        data-app="explorer"
      >
        <img
          src="./assets/icons/explorer.png"
          alt="explorer"
        >
      </div>

      <div
        class="dock-item"
        data-app="viewer"
      >
        <img
          src="./assets/icons/viewer.png"
          alt="viewer"
        >
      </div>
    `;

    const items =
      container.querySelectorAll(
        ".dock-item"
      );

    for(const item of items){

      item.addEventListener(
        "click",
        () => {

          Mount.open(
            item.dataset.app
          );

        }
      );

    }

  }

}; 
