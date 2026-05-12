import { PermissionManager }
from "./permissions.js";

export const Sandbox = {

  verify(app){

    const permissions = [
      "filesystem",
      "notifications",
      "audio"
    ];

    return permissions.filter(
      permission =>
        PermissionManager.has(
          app,
          permission
        )
    );

  }

}; 
