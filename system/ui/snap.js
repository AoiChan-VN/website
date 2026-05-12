export const SnapManager = {

  apply(win){

    const threshold = 24;

    const rect =
      win.getBoundingClientRect();

    if(rect.left < threshold){

      win.style.left = "0px";
    }

    if(rect.top < threshold){

      win.style.top = "42px";
    }

    if(
      window.innerWidth -
      rect.right <
      threshold
    ){

      win.style.left =
        `${window.innerWidth - rect.width}px`;
    }

  }

}; 
