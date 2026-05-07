/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { getRepositories }
from "../services/repository.service.js";

export function renderDashboardPage(
  root
) {

  const repositories =
    getRepositories();

  const totalRepositories =
    repositories.length;

  const totalStars =
    repositories.reduce(
      (total, repository) =>
        total + repository.stars,
      0
    );

  root.innerHTML = `

    <section class="dashboard-section">

      <div class="dashboard-header">

        <h1 class="dashboard-title">
          Development Dashboard
        </h1>

      </div>

      <div class="dashboard-grid">

        <article class="dashboard-card">

          <span class="dashboard-card-label">
            Total Repositories
          </span>

          <h2 class="dashboard-card-value">
            ${totalRepositories}
          </h2>

        </article>

        <article class="dashboard-card">

          <span class="dashboard-card-label">
            Total Stars
          </span>

          <h2 class="dashboard-card-value">
            ${totalStars}
          </h2>

        </article>

      </div>

    </section>

  `;

} 
