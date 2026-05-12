import { PackageManager }
from "../core/packages.js";

export async function createApp(){

  const root =
    document.createElement("div");

  root.className =
    "package-manager";

  root.innerHTML = `
    <div class="package-header">
      Package Manager
    </div>

    <div class="package-grid"></div>
  `;

  const grid =
    root.querySelector(
      ".package-grid"
    );

  const packages = [

    {
      id:"terminal",

      name:"Terminal",

      description:
        "System shell runtime",

      icon:
        "./assets/icons/terminal.png"
    },

    {
      id:"explorer",

      name:"Explorer",

      description:
        "Filesystem navigator",

      icon:
        "./assets/icons/explorer.png"
    }

  ];

  for(const pkg of packages){

    const card =
      document.createElement("article");

    card.className =
      "package-card";

    card.innerHTML = `
      <div class="package-cover">

        <img
          src="${pkg.icon}"
          alt="${pkg.name}"
        >

      </div>

      <div class="package-body">

        <div class="package-title">
          ${pkg.name}
        </div>

        <div class="package-description">
          ${pkg.description}
        </div>

        <div class="package-actions">

          <button
            class="package-install"
          >
            Install
          </button>

        </div>

      </div>
    `;

    const button =
      card.querySelector(
        ".package-install"
      );

    button.addEventListener(
      "click",
      () => {

        PackageManager.install(
          pkg
        );

        button.textContent =
          "Installed";

      }
    );

    grid.appendChild(card);

  }

  return {

    id:"packages",

    title:"Packages",

    element:root

  };

} 
