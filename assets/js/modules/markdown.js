function escapeHTML(text) {

  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}

function inline(text) {

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
      /`([^`]+)`/g,
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
          || href.startsWith("./")
          || href.startsWith("#");

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

export function renderMarkdown(
  raw
) {

  const lines =
    raw.split("\n");

  const html = [];

  let code = false;

  for (const line of lines) {

    if (
      line.startsWith("```")
    ) {

      code = !code;

      html.push(
        code
          ? "<pre><code>"
          : "</code></pre>"
      );

      continue;

    }

    if (code) {

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
          ${inline(
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
          ${inline(
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
          ${inline(
            line.slice(2)
          )}
        </blockquote>
      `);

      continue;

    }

    if (
      line.startsWith("- ")
    ) {

      html.push(`
        <li>
          ${inline(
            line.slice(2)
          )}
        </li>
      `);

      continue;

    }

    if (
      line.trim() === ""
    ) {

      html.push("<br>");

      continue;

    }

    html.push(`
      <p>
        ${inline(line)}
      </p>
    `);

  }

  return html.join("");

  } 
