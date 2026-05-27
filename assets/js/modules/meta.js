export function updateMeta({
  title,
  description
}) {

  document.title =
    title;

  const descriptionMeta =
    document.querySelector(
      'meta[name="description"]'
    );

  if (descriptionMeta) {

    descriptionMeta.setAttribute(
      "content",
      description
    );

  }

} 
