function escapeHTML(value) {

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}

function parseInline(text) {

  let output =
    escapeHTML(text);

  output =
    output.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

  output =
    output.replace(
      /\*(.*?)\*/g,
      "<em>$1</em>"
    );

  output =
    output.replace(
      /`(.*?)`/g,
      "<code>$1</code>"
    );

  output =
    output.replace(
      /\[(.*?)\]\((.*?)\)/g,
      (
        _,
        label,
        href
      ) => {

        const safe =
          href.startsWith("http")
          || href.startsWith("#")
          || href.startsWith("./");

        if (!safe) {
          return label;
        }

        return `
          <a
            href="${href}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${label}
          </a>
        `;

      }
    );

  return output;

}

export function renderMarkdown(raw) {

  const lines =
    raw.split("\n");

  const html = [];

  let inCode = false;

  for (const line of lines) {

    if (
      line.startsWith("```")
    ) {

      inCode = !inCode;

      html.push(
        inCode
          ? "<pre><code>"
          : "</code></pre>"
      );

      continue;

    }

    if (inCode) {

      html.push(
        escapeHTML(line)
      );

      continue;

    }

    if (
      line.startsWith("# ")
    ) {

      html.push(`
        <h1>
          ${parseInline(
            line.slice(2)
          )}
        </h1>
      `);

      continue;

    }

    if (
      line.startsWith("## ")
    ) {

      html.push(`
        <h2>
          ${parseInline(
            line.slice(3)
          )}
        </h2>
      `);

      continue;

    }

    if (
      line.startsWith("> ")
    ) {

      html.push(`
        <blockquote>
          ${parseInline(
            line.slice(2)
          )}
        </blockquote>
      `);

      continue;

    }

    if (
      line.trim() === ""
    ) {

      html.push("<br />");

      continue;

    }

    html.push(`
      <p>
        ${parseInline(line)}
      </p>
    `);

  }

  return html.join("");

}
