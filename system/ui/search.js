import { Registry }
from "../core/registry.js";

import { Mount }
from "../boot/mount.js";

export const Search = {

  node:null,

  initialize(){

    window.addEventListener(
      "keydown",
      event => {

        if(
          event.ctrlKey &&
          event.key.toLowerCase() === "k"
        ){

          event.preventDefault();

          this.toggle();

        }

      }
    );

  },

  toggle(){

    if(this.node){

      this.destroy();

      return;

    }

    this.create();

  },

  create(){

    this.node =
      document.createElement("div");

    this.node.className =
      "system-search";

    this.node.innerHTML = `
      <input
        class="search-input"
        placeholder="Search apps..."
      >

      <div class="search-results"></div>
    `;

    document.body.appendChild(
      this.node
    );

    const input =
      this.node.querySelector(
        ".search-input"
      );

    const results =
      this.node.querySelector(
        ".search-results"
      );

    const render = value => {

      const apps =
        Object.values(
          Registry.data.apps
        );

      const filtered =
        apps.filter(
          app =>
            app.id.includes(
              value.toLowerCase()
            )
        );

      results.innerHTML =
        filtered.map(
          app => `
            <div
              class="search-item"
              data-app="${app.id}"
            >
              ${app.id}
            </div>
          `
        ).join("");

      const items =
        results.querySelectorAll(
          ".search-item"
        );

      for(const item of items){

        item.addEventListener(
          "click",
          () => {

            Mount.open(
              item.dataset.app
            );

            this.destroy();

          }
        );

      }

    };

    render("");

    input.addEventListener(
      "input",
      () => {

        render(input.value);

      }
    );

    input.focus();

  },

  destroy(){

    this.node?.remove();

    this.node = null;

  }

}; 
