import { renderHomePage } from "../pages/home.page.js";
import { renderPluginsPage } from "../pages/plugins.page.js";

const routes = {

  "/": renderHomePage,
  "/plugins": renderPluginsPage

};

export function initializeRouter() {

  window.addEventListener(
    "popstate",
    renderRoute
  );

  document.addEventListener(
    "click",
    handleNavigation
  );

  renderRoute();

}

function handleNavigation(event) {

  const target =
    event.target.closest("[data-route]");

  if (!target) {
    return;
  }

  event.preventDefault();

  const path =
    target.getAttribute("href");

  history.pushState({}, "", path);

  renderRoute();

}

function renderRoute() {

  const root =
    document.getElementById("app-root");

  const renderer =
    routes[location.pathname];

  if (!renderer) {

    root.innerHTML =
      "<h1>404</h1>";

    return;

  }

  renderer(root);

} 
