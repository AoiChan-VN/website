const ALLOWED_PROTOCOLS = [
  "http:",
  "https:"
];

export function safeURL(
  value
) {

  try {

    const url =
      new URL(
        value,
        window.location.origin
      );

    if (
      !ALLOWED_PROTOCOLS.includes(
        url.protocol
      )
    ) {

      return "";
    }

    return url.href;

  } catch {

    return "";

  }

}

export function safeText(
  value
) {

  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/[{}]/g, "")
    .trim();

}
