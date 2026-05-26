export function validateItem(item) {

  return (

    typeof item.id === "string"

    && typeof item.name === "string"

    && typeof item.description === "string"

    && typeof item.img === "string"

    && typeof item.file === "string"

  );

}
