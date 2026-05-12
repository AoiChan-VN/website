export const WindowManager = {

  zIndex:200,

  create({
    id,
    title,
    content
  }){

    const layer =
      document.getElementById(
        "window-layer"
      );

    const win =
      document.createElement("section");

    win.className =
      "system-window";

    win.dataset.window =
      id;

    win.style.zIndex =
      ++this.zIndex;

    win.innerHTML = `
      <div class="window-header">

        <div class="window-title">
          ${title}
        </div>

        <div class="window-actions">

          <button
            class="window-action window-minimize"
          ></button>

          <button
            class="window-action window-expand"
          ></button>

          <button
            class="window-action window-close"
          ></button>

        </div>

      </div>

      <div class="window-body"></div>
    `;

    const body =
      win.querySelector(
        ".window-body"
      );

    if(content instanceof HTMLElement){

      body.appendChild(content);

    }else{

      body.innerHTML = content;

    }

    this.bind(win);

    layer.appendChild(win);

    return win;

  },

  bind(win){

    win.addEventListener(
      "mousedown",
      () => {

        win.style.zIndex =
          ++this.zIndex;

      }
    );

    const close =
      win.querySelector(
        ".window-close"
      );

    close.addEventListener(
      "click",
      () => {

        win.remove();

      }
    );

  }

}; 
