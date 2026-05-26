export function syncNavigation() {

  const route =
    (
      window.location.hash
      || "#/home"
    )
    .replace("#/", "")
    .split("/")[0];

  const items =
    document.querySelectorAll(
      ".nav-item"
    );

  items.forEach((item) => {

    const target =
      item.dataset.route;

    if (target === route) {

      item.classList.add(
        "active"
      );

      return;

    }

    item.classList.remove(
      "active"
    );

  });

} 
