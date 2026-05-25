const overlay =
  document.getElementById("overlay");

const panel =
  document.getElementById("panel");

const panelContent =
  document.getElementById("panel-content");

const closePanelButton =
  document.getElementById("close-panel");

function openPanel(item){

  panelContent.innerHTML = "";

  const title =
    createElement("h2");

  title.textContent = item.name;

  panelContent.appendChild(title);

  const links =
    createElement("div","panel-links");

  if(item.link){

    const anchor =
      createElement("a","panel-link");

    anchor.href = item.link;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";

    anchor.textContent = "Open Link";

    links.appendChild(anchor);
  }

  if(item.file){

    const button =
      createElement("button","panel-link");

    button.type = "button";

    button.textContent = "Open Content";

    button.addEventListener(
      "click",
      async () => {

        const response =
          await fetch(item.file);

        const markdown =
          await response.text();

        const content =
          markdownToHtml(markdown);

        links.innerHTML = content;
      }
    );

    links.appendChild(button);
  }

  panelContent.appendChild(links);

  overlay.classList.remove("hidden");
  panel.classList.remove("hidden");
}

function closePanel(){

  overlay.classList.add("hidden");
  panel.classList.add("hidden");
}

overlay.addEventListener(
  "click",
  closePanel
);

closePanelButton.addEventListener(
  "click",
  closePanel
); 
