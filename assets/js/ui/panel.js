const panel =
  document.getElementById(
    "floating-panel"
  );

const panelContent =
  document.getElementById(
    "panel-content"
  );

const closeButton =
  document.getElementById(
    "close-panel"
  );

closeButton.addEventListener(
  "click",
  closePanel
);

export function openPanel(content) {

  panelContent.innerHTML =
    content;

  panel.classList.remove(
    "hidden"
  );
}

export function closePanel() {

  panel.classList.add(
    "hidden"
  );
} 
