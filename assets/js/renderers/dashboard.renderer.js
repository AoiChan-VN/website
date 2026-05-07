import {
  calculateDashboardStats
}
from "../modules/dashboard/dashboard.stats.js";

export function renderDashboardCards(
  target,
  repositories
) {

  const stats =
    calculateDashboardStats(
      repositories
    );

  target.innerHTML = `

    <article class="dashboard-card">

      <span class="dashboard-card-label">
        Total Repositories
      </span>

      <h2 class="dashboard-card-value">
        ${stats.repositories}
      </h2>

    </article>

    <article class="dashboard-card">

      <span class="dashboard-card-label">
        Total Stars
      </span>

      <h2 class="dashboard-card-value">
        ${stats.totalStars}
      </h2>

    </article>

  `;

} 
