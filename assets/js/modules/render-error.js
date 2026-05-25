export function renderError(container) {

  container.innerHTML = `
    <div class="error-state glass-card">

      <h3 class="error-title">
        Load Failed
      </h3>

      <p class="error-description">
        Không thể tải dữ liệu portfolio.
      </p>

    </div>
  `;

} 
