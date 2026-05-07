/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { renderHomePage }
from "../pages/home.page.js";

import { renderPluginsPage }
from "../pages/plugins.page.js";

import { renderRepositoriesPage }
from "../pages/repositories.page.js";

import { renderDashboardPage }
from "../pages/dashboard.page.js";

import { renderNavbar }
from "../modules/navbar/navbar.js";

import { renderFooter }
from "../modules/footer/footer.js";

const routes = {

  "/":
    renderHomePage,

  "/plugins":
    renderPluginsPage,

  "/repositories":
    renderRepositoriesPage,

  "/dashboard":
    renderDashboardPage

};

export function initializeRouter() {

  renderNavbar();

  renderFooter();

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
    event.target.closest(
      "[data-route]"
    );

  if (!target) {
    return;
  }

  event.preventDefault();

  const path =
    target.getAttribute(
      "href"
    );

  history.pushState(
    {},
    "",
    path
  );

  renderRoute();

}

function renderRoute() {

  const root =
    document.getElementById(
      "app-root"
    );

  const renderer =
    routes[location.pathname];

  if (!renderer) {

    root.innerHTML = `

      <section class="not-found">

        <h1>
          404
        </h1>

      </section>

    `;

    return;

  }

  renderer(root);

}
