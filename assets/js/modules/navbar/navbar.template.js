export function navbarTemplate() {

  return `

    <nav class="navbar">

      <a
        href="/"
        data-route
        class="navbar-logo"
      >
        AoiChan
      </a>

      <div class="navbar-links">

        <a
          href="/plugins"
          data-route
          class="navbar-link"
        >
          Plugins
        </a>

        <a
          href="/repositories"
          data-route
          class="navbar-link"
        >
          Repositories
        </a>

        <a
          href="/dashboard"
          data-route
          class="navbar-link"
        >
          Dashboard
        </a>

      </div>

      <button
        id="theme-toggle"
        class="theme-toggle"
      >
        Theme
      </button>

    </nav>

  `;

} 
