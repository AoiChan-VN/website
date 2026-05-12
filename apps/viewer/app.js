export async function createApp(){

  const root =
    document.createElement("div");

  root.className =
    "viewer-app";

  root.innerHTML = `
    <div class="article-view">

      <h1>
        Viewer Engine
      </h1>

      <p>
        Dynamic content renderer initialized.
      </p>

    </div>
  `;

  return {

    id:"viewer",

    title:"Viewer",

    element:root

  };

} 
