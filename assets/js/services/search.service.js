/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { pluginsDatabase }
from "../database/plugins.db.js";

import { repositoriesDatabase }
from "../database/repositories.db.js";

let searchableData = [];

export function initializeSearchEngine() {

  buildSearchableDatabase();

  const input =
    document.getElementById(
      "global-search-input"
    );

  if (!input) {
    return;
  }

  input.addEventListener(
    "input",
    handleSearch
  );

}

function buildSearchableDatabase() {

  searchableData = [

    ...pluginsDatabase,

    ...repositoriesDatabase

  ];

}

function handleSearch(event) {

  const keyword =
    event.target.value
      .toLowerCase()
      .trim();

  const cards =
    document.querySelectorAll(
      ".plugin-card, .repository-card"
    );

  if (!keyword) {

    cards.forEach(card => {

      card.classList.remove(
        "hidden"
      );

    });

    return;

  }

  cards.forEach(card => {

    const content =
      card.textContent.toLowerCase();

    const matched =
      content.includes(keyword);

    card.classList.toggle(
      "hidden",
      !matched
    );

  });

} 
