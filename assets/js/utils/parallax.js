import { CONFIG }
from "../config.js";

export function initParallax(){

  const layers =
    document.querySelectorAll(
      ".parallax-layer"
    );

  window.addEventListener(
    "mousemove",
    event => {

      const x =
        (
          window.innerWidth / 2 -
          event.clientX
        ) / CONFIG.parallaxIntensity;

      const y =
        (
          window.innerHeight / 2 -
          event.clientY
        ) / CONFIG.parallaxIntensity;

      layers.forEach((layer,index) => {

        const depth =
          index + 1;

        layer.style.transform =
          `translate3d(${x / depth}px, ${y / depth}px, 0)`;

      });

    },
    {
      passive:true
    }
  );
} 
