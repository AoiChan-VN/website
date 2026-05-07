export function renderRepositories(
  target,
  repositories
) {

  target.innerHTML =
    repositories
      .map(repository => {

        return `

          <article
            class="repository-card"
          >

            <div
              class="repository-card-header"
            >

              <h2
                class="repository-name"
              >
                ${repository.name}
              </h2>

              <span
                class="repository-language"
              >
                ${repository.language}
              </span>

            </div>

            <p
              class="repository-description"
            >
              ${repository.description}
            </p>

            <div
              class="repository-meta"
            >

              <span>
                ⭐ ${repository.stars}
              </span>

              <span>
                ${repository.updated_at}
              </span>

            </div>

          </article>

        `;

      })
      .join("");

} 
