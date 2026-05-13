import { Runtime }
from "./system/core/runtime.js";

import { secureBoot }
from "./system/core/secure-boot.js";

async function bootstrap(){

  try{

    console.log(
      "[Aoi] Boot sequence started"
    );

    if(
      "serviceWorker"
      in navigator
    ){

      await navigator
        .serviceWorker
        .register("./sw.js");

      console.log(
        "[Aoi] Service Worker ready"
      );

    }

    await secureBoot();

    await Runtime.initialize();

    console.log(
      "[Aoi] System online"
    );

  }catch(error){

    console.error(
      "[AOI BOOT ERROR]",
      error
    );

    document.body.innerHTML = `
      <div
        style="
          position:fixed;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#0b0d12;
          color:#fff;
          font-family:sans-serif;
        "
      >

        <div>

          <h1>
            Aoi Runtime Error
          </h1>

          <pre>
${error.message}
          </pre>

        </div>

      </div>
    `;

  }

}

bootstrap(); 
