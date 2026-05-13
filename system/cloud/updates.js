export const UpdateRuntime = {

  async check(url){

    const response =
      await fetch(url);

    const release =
      await response.json();

    return release;

  }

}; 
