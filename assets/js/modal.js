const panel = document.getElementById("card-panel");
const overlay = document.getElementById("panel-overlay");
const closeButton = document.getElementById("panel-close");

export function openPanel(content){

  const container =
    document.getElementById("panel-content");

  container.innerHTML = content;

  panel.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

export function closePanel(){

  panel.classList.add("hidden");
  overlay.classList.add("hidden");
}

closeButton.addEventListener(
  "click",
  closePanel
);

overlay.addEventListener(
  "click",
  closePanel
); 
