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

import { renderDocsPage }
from "../pages/docs.page.js";

import { renderNavbar }
from "../modules/navbar/navbar.js";

import { renderFooter }
from "../modules/footer/footer.js";

import { updateSEO }
from "./seo.js";

import { transitionPage }
from "./page-transition.js";

import { initializeLazyImages }
from "./lazy-image.js";

const routes = {

  "/": {

    render:
      renderHomePage,

    seo: {

      title:
        "AoiChan Portfolio",

      description:
        "Minecraft plugin ecosystems and infrastructures.",

      path:
        "/"

    }

  },

  "/plugins": {

    render:
      renderPluginsPage,

    seo: {

      title:
        "Plugins | AoiChan",

      description:
        "Minecraft plugin systems and infrastructures.",

      path:
        "/plugins"

    }

  },

  "/repositories": {

    render:
      renderRepositoriesPage,

    seo: {

      title:
        "Repositories | AoiChan",

      description:
        "GitHub repository infrastructure dashboard.",

      path:
        "/repositories"

    }

  },

  "/dashboard": {

    render:
      renderDashboardPage,

    seo: {

      title:
        "Dashboard | AoiChan",

      description:
        "Development metrics and repository analytics.",

      path:
        "/dashboard"

    }

  },

  "/docs": {

    render:
      renderDocsPage,

    seo: {

      title:
        "Documentation | AoiChan",

      description:
        "Project documentation and infrastructure guides.",

      path:
        "/docs"

    }

  }

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

function handleNavigation(
  event
) {

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

async function renderRoute() {

  const root =
    document.getElementById(
      "app-root"
    );

  const route =
    routes[location.pathname];

  if (!route) {

    root.innerHTML = `

      <section class="not-found">

        <h1>
          404
        </h1>

      </section>

    `;

    return;

  }

  updateSEO(
    route.seo
  );

  await transitionPage(
    async () => {

      await route.render(root);

      initializeLazyImages();

    }
  );

}
