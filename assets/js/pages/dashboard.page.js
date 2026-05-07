/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { getRepositories }
from "../services/repository.service.js";

import {
  renderDashboardCards
}
from "../renderers/dashboard.renderer.js";

export function renderDashboardPage(
  root
) {

  root.innerHTML = `

    <section class="dashboard-section">

      <div class="dashboard-header">

        <span class="page-label">
          Development Metrics
        </span>

        <h1 class="dashboard-title">
          Project Dashboard
        </h1>

      </div>

      <div
        class="dashboard-grid"
        id="dashboard-grid"
      ></div>

    </section>

  `;

  const repositories =
    getRepositories();

  const target =
    document.getElementById(
      "dashboard-grid"
    );

  renderDashboardCards(
    target,
    repositories
  );

}
