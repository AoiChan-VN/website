import { RuntimeInspector }
from "../sdk/runtime-inspector.js";

import { RuntimeDebugger }
from "../sdk/debugger.js";

import { ManifestValidator }
from "../sdk/manifest-validator.js";

export async function createApp(){

  const root =
    document.createElement("div");

  root.className =
    "devtools-app";

  root.innerHTML = `
    <div class="devtools-header">
      Nova DevTools
    </div>

    <div class="devtools-layout">

      <aside class="devtools-sidebar">

        <div
          class="devtools-item"
          data-view="runtime"
        >
          Runtime Snapshot
        </div>

        <div
          class="devtools-item"
          data-view="logs"
        >
          Debug Logs
        </div>

        <div
          class="devtools-item"
          data-view="manifest"
        >
          Manifest Validation
        </div>

      </aside>

      <section
        class="devtools-panel"
      >

        <div class="devtools-code">
          Nova SDK Runtime
        </div>

      </section>

    </div>
  `;

  const panel =
    root.querySelector(
      ".devtools-panel"
    );

  const items =
    root.querySelectorAll(
      ".devtools-item"
    );

  items.forEach(
    item => {

      item.addEventListener(
        "click",
        () => {

          const view =
            item.dataset.view;

          render(
            view,
            panel
          );

        }
      );

    }
  );

  return {

    id:"devtools",

    title:"DevTools",

    element:root

  };

}

function render(
  view,
  panel
){

  if(view === "runtime"){

    const snapshot =
      RuntimeInspector.snapshot();

    panel.innerHTML = `
      <div class="devtools-code">
${JSON.stringify(
  snapshot,
  null,
  2
)}
      </div>
    `;

    return;
  }

  if(view === "logs"){

    panel.innerHTML = `
      <div class="devtools-code">
${JSON.stringify(
  RuntimeDebugger.all(),
  null,
  2
)}
      </div>
    `;

    return;
  }

  if(view === "manifest"){

    const result =
      ManifestValidator.validate({

        id:"sample",

        title:"Sample",

        icon:"icon.png",

        entry:"app.js"

      });

    panel.innerHTML = `
      <div class="devtools-code">
${JSON.stringify(
  result,
  null,
  2
)}
      </div>
    `;

  }

} 
