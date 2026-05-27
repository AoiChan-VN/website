import { renderHome }
from "../views/home.js";

import { renderPost }
from "../views/post.js";

const root =
  document.getElementById(
    "app"
  );

function normalizeHash() {

  const hash =
    window.location.hash
      .replace(/\/+/g, "/")
      .trim();

  if (
    !hash
    || hash === "#"
  ) {

    return "#/";

  }

  return hash;

}

async function resolveRoute() {

  const hash =
    normalizeHash();

  const cleaned =
    hash.replace(
      /^#\//,
      ""
    );

  const segments =
    cleaned
      .split("/")
      .filter(Boolean);

  root.innerHTML = "";

  try {

    if (!segments.length) {

      await renderHome(root);

      return;

    }

    if (
      segments[0] === "posts"
    ) {

      await renderPost(
        root,
        segments
      );

      return;

    }

    root.innerHTML = `
      <section class="error-view">

        <div class="error-code">
          👻︵𝓔𝓻𝓻𝓸𝓻
        </div>

        <h1 class="error-title">
          Route Not Found
        </h1>

      </section>
    `;

  } catch (error) {

    console.error(error);

    root.innerHTML = `
      <section class="error-view">

        <div class="error-code">
          「Error」
        </div>

        <h1 class="error-title">
          Failed To Render
        </h1>

      </section>
    `;

  }

}

export async function initRouter() {

  window.addEventListener(
    "hashchange",
    resolveRoute
  );

  await resolveRoute();

}
