export function createBackground(){

  const root =
    document.getElementById(
      "background-root"
    );

  const layers = [
    "bg-layer-1.webp",
    "bg-layer-2.webp",
    "bg-layer-3.webp",
    "bg-layer-4.webp"
  ];

  layers.forEach((file,index) => {

    const layer =
      document.createElement("div");

    layer.className =
      `parallax-layer layer-${index + 1}`;

    layer.style.backgroundImage =
      `url("./assets/images/background/${file}")`;

    root.appendChild(layer);

  });
} 
