export const GitHubSync = {

  async publish({
    repository,
    content,
    token,
    path
  }){

    const response =
      await fetch(

        `https://api.github.com/repos/${repository}/contents/${path}`,

        {
          method:"PUT",

          headers:{
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

            message:
              "Nova Runtime Sync",

            content:btoa(content)

          })

        }

      );

    return response.ok;

  }

}; 
