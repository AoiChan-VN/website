export function syncNavigation() {

  const items =
    document.querySelectorAll(
      ".nav-item"
    );

  const hash =
    window.location.hash
    || "#/";

  items.forEach((item) => {

    item.classList.remove(
      "active"
    );

    const href =
      item.getAttribute(
        "href"
      );

    if (
      href === hash
      || (
        href === "#/posts"
        && hash.startsWith(
          "#/posts/"
        )
      )
    ) {

      item.classList.add(
        "active"
      );

    }

  });

}
