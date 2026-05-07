const STORAGE_KEY = "aoichan-theme";

export function initializeTheme() {

  const savedTheme =
    localStorage.getItem(STORAGE_KEY);

  const theme =
    savedTheme || "obsidian";

  applyTheme(theme);

}

export function toggleTheme() {

  const currentTheme =
    document.documentElement.dataset.theme;

  const nextTheme =
    currentTheme === "obsidian"
      ? "light"
      : "obsidian";

  applyTheme(nextTheme);

}

function applyTheme(theme) {

  document.documentElement.dataset.theme =
    theme;

  localStorage.setItem(
    STORAGE_KEY,
    theme
  );

} 
