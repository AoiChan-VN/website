import { renderHome }
from "./views/home.js";

import { renderArticle }
from "./views/article.js";

import { Fetcher }
from "../../system/utils/fetcher.js";

export async function createApp(){

  const root =
    document.createElement("div");

  root.className =
    "profile-app";

  const home =
    await renderHome();

  root.appendChild(home);

  bindProfileEvents(root);

  return {

    id:"profile",

    title:"Fantasy Profiles",

    element:root

  };

}

function bindProfileEvents(
  root
){

  const cards =
    root.querySelectorAll(
      ".profile-card"
    );

  for(const card of cards){

    card.addEventListener(
      "click",
      async () => {

        const profileId =
          card.dataset.profile;

        const profile =
          await Fetcher.json(
            `./database/fantasy/${profileId}.json`
          );

        if(
          !profile.articles?.length
        ){
          return;
        }

        const article =
          profile.articles[0];

        const view =
          await renderArticle(
            article.file
          );

        root.innerHTML = "";

        root.appendChild(view);

      }
    );

  }

}
