export const BlurPipeline = {

  apply(node){

    node.style.backdropFilter =
      "blur(24px)";

    node.style.webkitBackdropFilter =
      "blur(24px)";
  }

}; 
