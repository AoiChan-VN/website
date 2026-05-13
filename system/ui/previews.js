export const PreviewRuntime = {

  create(title){

    const preview =
      document.createElement("div");

    preview.style.position =
      "absolute";

    preview.style.bottom =
      "90px";

    preview.style.width =
      "240px";

    preview.style.height =
      "160px";

    preview.style.borderRadius =
      "18px";

    preview.style.background =
      "rgba(20,22,28,.92)";

    preview.style.border =
      "1px solid rgba(255,255,255,.06)";

    preview.style.backdropFilter =
      "blur(18px)";

    preview.style.padding =
      "18px";

    preview.innerHTML = `
      <strong>${title}</strong>
    `;

    return preview;

  }

}; 
