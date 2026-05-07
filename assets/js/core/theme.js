/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { StorageManager }
from "./storage.js";

const STORAGE_KEY =
  "aoichan-theme";

const THEMES = {

  obsidian:
    "theme-obsidian",

  nebula:
    "theme-nebula",

  eclipse:
    "theme-eclipse"

};

export function initializeTheme() {

  const savedTheme =
    StorageManager.get(
      STORAGE_KEY,
      "obsidian"
    );

  applyTheme(
    savedTheme
  );

}

export function toggleTheme() {

  const currentTheme =
    getCurrentTheme();

  const nextTheme =
    getNextTheme(
      currentTheme
    );

  applyTheme(
    nextTheme
  );

}

export function applyTheme(
  theme
) {

  removeThemeClasses();

  const themeClass =
    THEMES[theme];

  document.body.classList.add(
    themeClass
  );

  StorageManager.set(
    STORAGE_KEY,
    theme
  );

}

function getCurrentTheme() {

  return StorageManager.get(
    STORAGE_KEY,
    "obsidian"
  );

}

function getNextTheme(
  current
) {

  const keys =
    Object.keys(THEMES);

  const currentIndex =
    keys.indexOf(current);

  const nextIndex =
    (currentIndex + 1)
    % keys.length;

  return keys[nextIndex];

}

function removeThemeClasses() {

  Object.values(THEMES)
    .forEach(theme => {

      document.body.classList.remove(
        theme
      );

    });

}
