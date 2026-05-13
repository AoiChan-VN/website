export const DeploymentRuntime = {

  environment(){

    const host =
      location.hostname;

    return {

      local:
        host === "localhost",

      github:
        host.includes(
          "github.io"
        ),

      secure:
        location.protocol ===
        "https:"
    };

  }

}; 
