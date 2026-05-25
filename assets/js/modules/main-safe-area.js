export function updateSafeArea() {

  const height =
    window.innerHeight;

  document.documentElement.style.setProperty(
    "--app-height",
    `${height}px`
  );

}
