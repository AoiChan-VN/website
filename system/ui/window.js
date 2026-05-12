import { ProcessManager }
from "../core/process.js";

import { SnapManager }
from "./snap.js";

export const WindowManager = {

  zIndex:300,

  windows:new Map(),

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

    const windowId =
      crypto.randomUUID();

    win.className =
      "system-window";

    win.dataset.window =
      windowId;

    win.style.zIndex =
      ++this.zIndex;

    const offset =
      this.windows.size * 24;

    win.style.left =
      `calc(50% + ${offset}px)`;

    win.style.top =
      `calc(50% + ${offset}px)`;

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

      <div class="window-resize"></div>
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

    this.makeFocusable(win);

    this.makeDraggable(win);

    this.makeResizable(win);

    this.bindControls(win);

    layer.appendChild(win);

    this.windows.set(
      windowId,
      {
        id,
        title,
        node:win
      }
    );

    ProcessManager.create({

      pid:windowId,

      app:id,

      window:win

    });

    return win;

  },

  makeFocusable(win){

    win.addEventListener(
      "mousedown",
      () => {

        win.style.zIndex =
          ++this.zIndex;

      }
    );

  },

  makeDraggable(win){

    const header =
      win.querySelector(
        ".window-header"
      );

    let active = false;

    let startX = 0;
    let startY = 0;

    let initialLeft = 0;
    let initialTop = 0;

    header.addEventListener(
      "mousedown",
      event => {

        active = true;

        startX = event.clientX;
        startY = event.clientY;

        initialLeft =
          win.offsetLeft;

        initialTop =
          win.offsetTop;

      }
    );

    window.addEventListener(
      "mousemove",
      event => {

        if(!active){
          return;
        }

        const deltaX =
          event.clientX - startX;

        const deltaY =
          event.clientY - startY;

        win.style.left =
          `${initialLeft + deltaX}px`;

        win.style.top =
          `${initialTop + deltaY}px`;

        win.style.transform =
          "none";

      }
    );

    window.addEventListener(
      "mouseup",
      () => {

        active = false;

      }
    );

  },

  makeResizable(win){

    const resize =
      win.querySelector(
        ".window-resize"
      );

    let active = false;

    let startX = 0;
    let startY = 0;

    let width = 0;
    let height = 0;

    resize.addEventListener(
      "mousedown",
      event => {

        event.preventDefault();

        active = true;

        startX = event.clientX;
        startY = event.clientY;

        width = win.offsetWidth;
        height = win.offsetHeight;

      }
    );

    window.addEventListener(
      "mousemove",
      event => {

        if(!active){
          return;
        }

        const deltaX =
          event.clientX - startX;

        const deltaY =
          event.clientY - startY;

        win.style.width =
          `${width + deltaX}px`;

        win.style.height =
          `${height + deltaY}px`;

      }
    );

    window.addEventListener(
      "mouseup",
      () => {

        active = false;

      }
    );

  },

  bindControls(win){

    const close =
      win.querySelector(
        ".window-close"
      );

    close.addEventListener(
      "click",
      () => {

        const id =
          win.dataset.window;

        this.windows.delete(id);

        win.remove();

      }
    );

  }

};
