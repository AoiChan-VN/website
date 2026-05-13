import { BackupRuntime }
from "./backup.js";

export const ExportRuntime = {

  download(){

    const snapshot =
      BackupRuntime.create();

    const blob =
      new Blob(
        [
          JSON.stringify(
            snapshot,
            null,
            2
          )
        ],
        {
          type:"application/json"
        }
      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "nova-workspace.json";

    link.click();

    URL.revokeObjectURL(url);

  }

}; 
