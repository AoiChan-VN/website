import { openPanel }
from "./panel.js";

import { openMarkdownViewer }
from "./viewer.js";

export function bindCardActions(
  card,
  item
) {

  const button =
    card.querySelector(
      "[data-action='panel']"
    );

  button.addEventListener(
    "click",
    () => {

      const hasDownload =
        item.download;

      const hasLink =
        item.link;

      let html = `
        <div class="action-list">

          <button
            class="panel-action"
            data-open-content
          >
            Open Content
          </button>
      `;

      if (hasDownload) {

        html += `
          <a
            class="panel-action"
            href="${item.download}"
            download
          >
            Download
          </a>
        `;
      }

      if (hasLink) {

        html += `
          <a
            class="panel-action"
            href="${item.link}"
            target="_blank"
          >
            External Link
          </a>
        `;
      }

      html += `
        </div>
      `;

      openPanel(html);

      requestAnimationFrame(() => {

        const openButton =
          document.querySelector(
            "[data-open-content]"
          );

        if (!openButton) {
          return;
        }

        openButton.addEventListener(
          "click",
          () => {

            openMarkdownViewer(
              item
            );

          }
        );

      });

    }
  );

} 
