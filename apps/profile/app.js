export async function createApp(){

  const root =
    document.createElement("div");

  root.className =
    "profile-app";

  root.innerHTML = `
    <div class="profile-home">

      <div class="profile-banner">

        <h1>
          Fantasy Profiles
        </h1>

      </div>

      <div class="profile-list">

        <article class="profile-card">

          <img
            src="./assets/images/frieren.webp"
            alt="Frieren"
          >

          <h2>
            Frieren
          </h2>

        </article>

      </div>

    </div>
  `;

  return {

    id:"profile",

    title:"Profile Viewer",

    element:root

  };

} 
