export const DocumentParser = {

  metadata(raw){

    const lines =
      raw.split("\n");

    const meta = {};

    for(const line of lines){

      if(
        !line.startsWith("@")
      ){
        continue;
      }

      const parts =
        line.split(":");

      const key =
        parts.shift()
          .replace("@","")
          .trim();

      const value =
        parts.join(":").trim();

      meta[key] = value;

    }

    return meta;

  }

};
