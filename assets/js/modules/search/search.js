/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { searchTemplate }
from "./search.template.js";

import {
  initializeSearchEngine
}
from "../../services/search.service.js";

export function renderSearch() {

  const target =
    document.getElementById(
      "search-slot"
    );

  if (!target) {
    return;
  }

  target.innerHTML =
    searchTemplate();

  initializeSearchEngine();

} 
