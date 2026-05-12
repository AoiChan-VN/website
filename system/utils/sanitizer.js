export const Sanitizer = {

  clean(value=""){

    return value
      .replaceAll(
        "<script",
        "&lt;script"
      )
      .replaceAll(
        "</script>",
        "&lt;/script&gt;"
      );

  }

}; 
