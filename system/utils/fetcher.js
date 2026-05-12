export const Fetcher = {

  async json(path){

    const response =
      await fetch(path);

    if(!response.ok){

      throw new Error(
        `[FETCH JSON FAILED] ${path}`
      );

    }

    return await response.json();

  },

  async text(path){

    const response =
      await fetch(path);

    if(!response.ok){

      throw new Error(
        `[FETCH TEXT FAILED] ${path}`
      );

    }

    return await response.text();

  }

}; 
