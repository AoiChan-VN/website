export async function createApp({
  type,
  source
}){

  const root =
    document.createElement("div");

  root.className =
    "media-viewer";

  if(type === "image"){

    root.innerHTML = `
      <img
        src="${source}"
        alt="media"
      >
    `;
  }

  if(type === "video"){

    root.innerHTML = `
      <video
        controls
        autoplay
        src="${source}"
      ></video>
    `;
  }

  return {

    id:"media-viewer",

    title:"Media Viewer",

    element:root

  };

} 
