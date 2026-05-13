import { CapabilityManager }
from "./capability.js";

import { PermissionUI }
from "./permission-ui.js";

import { TrustManager }
from "./trust.js";

export const RuntimeSecurity = {

  async authorize({
    app,
    capability,
    description
  }){

    if(
      CapabilityManager.has(
        app,
        capability
      )
    ){

      return true;
    }

    const allowed =
      await PermissionUI.request({

        app,

        permission:capability,

        description

      });

    if(allowed){

      CapabilityManager.register(
        app,
        [capability]
      );

      TrustManager.trust(app);
    }

    return allowed;

  }

}; 
