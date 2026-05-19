export function initNavbar() {
  const links = document.querySelectorAll(".navbar a");

  links.forEach(link => {
    link.addEventListener("click", handleNavigation);
  });
}

function handleNavigation(event) {
  const target = event.currentTarget;

  if (!(target instanceof HTMLAnchorElement)) {
    return;
  }

  console.log("Navigate:", target.href);
} 
