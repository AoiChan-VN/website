export function applyTheme(theme) {

  document.body.classList.remove(
    "theme-fantasy-blue",
    "theme-crystal-purple",
    "theme-sakura-night"
  );

  document.body.classList.add(
    `theme-${theme}`
  );

} 
