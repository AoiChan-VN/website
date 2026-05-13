export const AssetRuntime = {

  preload(paths=[]){

    paths.forEach(
      path => {

        const link =
          document.createElement(
            "link"
          );

        link.rel =
          "preload";

        link.as =
          "image";

        link.href =
          path;

        document.head.appendChild(
          link
        );

      }
    );

  }

}; 
