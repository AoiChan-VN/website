const STORAGE_KEY = "theme";

export function initTheme() {
  const themeButton = document.querySelector(".theme-toggle");

  if (!themeButton) {
    return;
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  themeButton.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const nextTheme = currentTheme === "light"
    ? "dark"
    : "light";

  document.documentElement.setAttribute("data-theme", nextTheme);

  localStorage.setItem(STORAGE_KEY, nextTheme);
} 
