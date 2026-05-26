import { renderHome }
from "../views/home.js";

import { renderPost }
from "../views/post.js";

import { syncNavigation }
from "../modules/navigation.js";

const app =
  document.getElementById(
    "app-view"
  );

const routes = {

  home:
    renderHome,

  posts:
    renderPost

};

export async function initRouter() {

  window.addEventListener(
    "hashchange",
    handleRoute,
    { passive: true }
  );

  await handleRoute();

}

async function handleRoute() {

  syncNavigation();

  const hash =
    window.location.hash
    || "#/home";

  const clean =
    hash.replace("#/", "");

  const segments =
    clean.split("/");

  const page =
    segments[0];

  const renderer =
    routes[page];

  app.innerHTML = "";

  if (!renderer) {

    render404();

    return;

  }

  await renderer(
    app,
    segments
  );

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

}

function render404() {

  app.innerHTML = `
    <section class="error-view">

      <span class="error-code">
        👻「404」
      </span>

      <h1 class="error-title">
        Page Not Found
      </h1>

    </section>
  `;

}
