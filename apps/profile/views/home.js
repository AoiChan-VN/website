import { Fetcher } from "../../../system/utils/fetcher.js";

export async function renderHome(){

  const database =
    await Fetcher.json(
      "./database/profile.json"
    );

  const profiles = [];

  for(
    const item
    of database.items
  ){

    const profile =
      await Fetcher.json(
        `./database/${database.dataset}/${item}.json`
      );

    profiles.push(profile);

  }

  const root =
    document.createElement("div");

  root.className =
    "profile-home";

  root.innerHTML = `
    <div class="profile-banner">

      <h1>
        Fantasy Profiles
      </h1>

    </div>

    <div class="profile-list">

      ${
        profiles.map(
          profile => `
            <article
              class="profile-card"
              data-profile="${profile.id}"
            >

              <img
                src="${profile.avatar}"
                alt="${profile.name}"
              >

              <div class="profile-card-body">

                <h2>
                  ${profile.name}
                </h2>

                <p>
                  ${profile.description}
                </p>

                <div class="profile-tags">

                  ${
                    profile.tags.map(
                      tag => `
                        <span class="profile-tag">
                          ${tag}
                        </span>
                      `
                    ).join("")
                  }

                </div>

              </div>

            </article>
          `
        ).join("")
      }

    </div>
  `;

  return root;

} 
