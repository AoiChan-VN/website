/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { getRepositories }
from "../services/repository.service.js";

import { renderRepositories }
from "../renderers/repository.renderer.js";

export function renderRepositoriesPage(
  root
) {

  root.innerHTML = `

    <section class="page-hero">

      <div class="page-hero-content">

        <span class="page-label">
          GitHub Infrastructure
        </span>

        <h1 class="page-title">
          Repository Systems
        </h1>

      </div>

    </section>

    <section class="repositories-wrapper">

      <div
        class="repository-grid"
        id="repository-grid"
      ></div>

    </section>

  `;

  const repositories =
    getRepositories();

  const target =
    document.getElementById(
      "repository-grid"
    );

  renderRepositories(
    target,
    repositories
  );

} 
