/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { getRepositories }
from "../services/repository.service.js";

import { renderRepositories }
from "../renderers/repository.renderer.js";

import { renderSearch }
from "../modules/search/search.js";

export async function renderRepositoriesPage(
  root
) {

  root.innerHTML = `

    <section class="page-hero">

      <div class="page-hero-content">

        <span class="page-label">
          Repository Systems
        </span>

        <h1 class="page-title">
          GitHub Infrastructure
        </h1>

        <div id="search-slot"></div>

      </div>

    </section>

    <section class="repositories-wrapper">

      <div
        class="repository-grid"
        id="repository-grid"
      ></div>

    </section>

  `;

  renderSearch();

  const repositories =
    await getRepositories();

  const target =
    document.getElementById(
      "repository-grid"
    );

  renderRepositories(
    target,
    repositories
  );

}
