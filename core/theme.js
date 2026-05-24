export function applyTheme(theme = {}) {

  const root = document.documentElement;

  Object.entries(theme)
    .forEach(([key, value]) => {

      root.style.setProperty(
        `--${key}`,
        value
      );

    });

} 
