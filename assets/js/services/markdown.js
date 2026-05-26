export function parseMarkdown(markdown) {

  if (
    typeof markdown !== "string"
  ) {
    return "";
  }

  const escapeHTML = (str) => {

    return str

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  };

  const parseInline = (text) => {

    return text

      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1" loading="lazy" />'
      )

      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )

      .replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
      )

      .replace(
        /(\*\*\*|___)(.*?)\1/g,
        "<strong><em>$2</em></strong>"
      )

      .replace(
        /(\*\*|__)(.*?)\1/g,
        "<strong>$2</strong>"
      )

      .replace(
        /(\*|_)(.*?)\1/g,
        "<em>$2</em>"
      )

      .replace(
        /~~([^~]+)~~/g,
        "<del>$1</del>"
      );

  };

  const lines =
    markdown.split(/\r?\n/);

  const result = [];

  let currentListType =
    null;

  let inBlockquote =
    false;

  let inCodeBlock =
    false;

  let codeBlockLang =
    "";

  let codeLines =
    [];

  for (
    let i = 0;
    i < lines.length;
    i++
  ) {

    const line =
      lines[i];

    const trimmed =
      line.trim();

    if (inCodeBlock) {

      if (
        trimmed.startsWith(
          "```"
        )
      ) {

        result.push(`
          <pre>
            <code class="language-${codeBlockLang}">
${escapeHTML(
  codeLines.join("\n")
)}
            </code>
          </pre>
        `);

        inCodeBlock = false;

        codeLines = [];

      } else {

        codeLines.push(line);

      }

      continue;
    }

    if (
      trimmed.startsWith(
        "```"
      )
    ) {

      if (
        currentListType
      ) {

        result.push(
          `</${currentListType}>`
        );

        currentListType =
          null;
      }

      if (inBlockquote) {

        result.push(
          "</blockquote>"
        );

        inBlockquote =
          false;
      }

      inCodeBlock = true;

      codeBlockLang =
        trimmed
          .substring(3)
          .trim()
        || "plaintext";

      continue;
    }

    const escapedLine =
      escapeHTML(line);

    const escapedTrimmed =
      escapedLine.trim();

    if (
      /^(?:-{3,}|\*{3,}|_{3,})$/
        .test(
          escapedTrimmed
        )
    ) {

      if (
        currentListType
      ) {

        result.push(
          `</${currentListType}>`
        );

        currentListType =
          null;
      }

      if (inBlockquote) {

        result.push(
          "</blockquote>"
        );

        inBlockquote =
          false;
      }

      result.push("<hr />");

      continue;
    }

    const headerMatch =
      escapedLine.match(
        /^(#{1,6})\s+(.+)$/
      );

    if (headerMatch) {

      if (
        currentListType
      ) {

        result.push(
          `</${currentListType}>`
        );

        currentListType =
          null;
      }

      if (inBlockquote) {

        result.push(
          "</blockquote>"
        );

        inBlockquote =
          false;
      }

      const level =
        headerMatch[1].length;

      const content =
        parseInline(
          headerMatch[2]
        );

      result.push(`
        <h${level}>
          ${content}
        </h${level}>
      `);

      continue;
    }

    if (
      escapedTrimmed.startsWith(
        "&gt;"
      )
    ) {

      if (
        currentListType
      ) {

        result.push(
          `</${currentListType}>`
        );

        currentListType =
          null;
      }

      if (!inBlockquote) {

        result.push(
          "<blockquote>"
        );

        inBlockquote =
          true;
      }

      const content =
        escapedLine.replace(
          /^\s*&gt;\s?/,
          ""
        );

      result.push(
        parseInline(content)
      );

      continue;
    }

    else if (
      inBlockquote
      && escapedTrimmed !== ""
    ) {

      result.push(
        parseInline(
          escapedLine
        )
      );

      continue;
    }

    else if (
      inBlockquote
      && escapedTrimmed === ""
    ) {

      result.push(
        "</blockquote>"
      );

      inBlockquote =
        false;
    }

    const ulMatch =
      escapedLine.match(
        /^(\s*)([*+-])\s+(.+)$/
      );

    if (ulMatch) {

      if (
        currentListType ===
        "ol"
      ) {

        result.push("</ol>");

        currentListType =
          null;
      }

      if (
        !currentListType
      ) {

        result.push("<ul>");

        currentListType =
          "ul";
      }

      result.push(`
        <li>
          ${parseInline(
            ulMatch[3]
          )}
        </li>
      `);

      continue;
    }

    const olMatch =
      escapedLine.match(
        /^(\s*)(\d+)\.\s+(.+)$/
      );

    if (olMatch) {

      if (
        currentListType ===
        "ul"
      ) {

        result.push("</ul>");

        currentListType =
          null;
      }

      if (
        !currentListType
      ) {

        result.push("<ol>");

        currentListType =
          "ol";
      }

      result.push(`
        <li>
          ${parseInline(
            olMatch[3]
          )}
        </li>
      `);

      continue;
    }

    if (
      currentListType
      && escapedTrimmed !== ""
    ) {

      result.push(
        `</${currentListType}>`
      );

      currentListType =
        null;
    }

    if (
      escapedTrimmed === ""
    ) {

      if (
        currentListType
      ) {

        result.push(
          `</${currentListType}>`
        );

        currentListType =
          null;
      }

      result.push("<br>");

    } else {

      result.push(`
        <p>
          ${parseInline(
            escapedLine
          )}
        </p>
      `);

    }

  }

  if (inCodeBlock) {

    result.push(`
      <pre>
        <code class="language-${codeBlockLang}">
${escapeHTML(
  codeLines.join("\n")
)}
        </code>
      </pre>
    `);

  }

  if (currentListType) {

    result.push(
      `</${currentListType}>`
    );

  }

  if (inBlockquote) {

    result.push(
      "</blockquote>"
    );

  }

  return result.join("\n");

} 
