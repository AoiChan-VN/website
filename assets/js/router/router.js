import { renderHome } from "../views/home.js";

const app =
  document.getElementById("app-view");

export async function initRouter() {

  window.addEventListener(
    "hashchange",
    handleRoute,
    { passive: true }
  );

  await handleRoute();

}

async function handleRoute() {

  const hash =
    window.location.hash || "#/home";

  const route =
    hash.replace("#/", "");

  app.innerHTML = "";

  switch (route) {

    case "home":
      await renderHome(app);
      break;

    default:
      app.innerHTML = `
        <section class="empty-view">
          <h2>404</h2>
        </section>
      `;

  }

} 
