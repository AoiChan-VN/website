export const Markdown = {

  parse(content=""){

    let html = content;

    html = this.escape(html);

    html = html.replace(
      /^# (.*$)/gim,
      "<h1>$1</h1>"
    );

    html = html.replace(
      /^## (.*$)/gim,
      "<h2>$1</h2>"
    );

    html = html.replace(
      /^### (.*$)/gim,
      "<h3>$1</h3>"
    );

    html = html.replace(
      /\*\*(.*?)\*\*/gim,
      "<strong>$1</strong>"
    );

    html = html.replace(
      /\*(.*?)\*/gim,
      "<em>$1</em>"
    );

    html = html.replace(
      /\n\n/gim,
      "</p><p>"
    );

    html = `
      <p>${html}</p>
    `;

    return html;

  },

  escape(value){

    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  }

}; 
