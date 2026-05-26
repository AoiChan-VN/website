export function createPanel(item){

  const panel =
    document.createElement("div");

  panel.className = "panel";

  if(item.link){

    const link =
      document.createElement("a");

    link.href = item.link;

    link.target = "_blank";

    link.rel =
      "noopener noreferrer";

    link.className =
      "panel-link";

    link.textContent =
      "Open Link";

    panel.appendChild(link);
  }

  return panel;
} 
