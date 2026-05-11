import Card from "./components/Card/Card.js";
import Panel from "./components/Panel/Panel.js";

const grid = document.getElementById("card-grid");

async function init() {
  renderSkeletons();

  const response = await fetch("./data/profile.json");

  const data = await response.json();

  grid.innerHTML = "";

  const panel = new Panel();

  for (const item of data) {
    const card = new Card(item, panel);

    await card.init();

    grid.appendChild(card.element);
  }
}

function renderSkeletons() {
  for (let i = 0; i < 6; i++) {
    const skeleton = document.createElement("div");

    skeleton.className = "skeleton-card";

    grid.appendChild(skeleton);
  }
}

init(); 
