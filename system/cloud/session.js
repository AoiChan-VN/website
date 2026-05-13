import { PersistenceRuntime }
from "./persistence.js";

export const SessionRuntime = {

  save(session){

    PersistenceRuntime.save(
      "session",
      session
    );

  },

  load(){

    return PersistenceRuntime.load(
      "session",
      null
    );

  }

}; 
