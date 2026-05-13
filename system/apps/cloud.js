import { ExportRuntime }
from "../cloud/export.js";

import { ImportRuntime }
from "../cloud/import.js";

import { BackupRuntime }
from "../cloud/backup.js";

export async function createApp(){

  const root =
    document.createElement("div");

  root.className =
    "cloud-app";

  root.innerHTML = `
    <div class="cloud-header">
      Cloud Runtime
    </div>

    <div class="cloud-content">

      <section class="cloud-card">

        <div class="cloud-card-title">
          Export Workspace
        </div>

        <div
          class="cloud-card-description"
        >
          Export current runtime
          workspace snapshot.
        </div>

        <button
          class="cloud-button export-btn"
        >
          Export
        </button>

      </section>

      <section class="cloud-card">

        <div class="cloud-card-title">
          Import Workspace
        </div>

        <div
          class="cloud-card-description"
        >
          Restore runtime from
          snapshot backup.
        </div>

        <button
          class="cloud-button import-btn"
        >
          Import
        </button>

        <input
          type="file"
          class="import-input"
          hidden
        >

      </section>

      <section class="cloud-card">

        <div class="cloud-card-title">
          Runtime Snapshot
        </div>

        <div
          class="cloud-card-description"
        >
          Generate runtime
          backup snapshot.
        </div>

        <button
          class="cloud-button snapshot-btn"
        >
          Snapshot
        </button>

      </section>

    </div>
  `;

  const exportButton =
    root.querySelector(
      ".export-btn"
    );

  const importButton =
    root.querySelector(
      ".import-btn"
    );

  const importInput =
    root.querySelector(
      ".import-input"
    );

  const snapshotButton =
    root.querySelector(
      ".snapshot-btn"
    );

  exportButton.addEventListener(
    "click",
    () => {

      ExportRuntime.download();

    }
  );

  importButton.addEventListener(
    "click",
    () => {

      importInput.click();

    }
  );

  importInput.addEventListener(
    "change",
    async event => {

      const file =
        event.target.files[0];

      if(!file){
        return;
      }

      await ImportRuntime.restore(
        file
      );

      alert(
        "Workspace restored."
      );

    }
  );

  snapshotButton.addEventListener(
    "click",
    () => {

      const snapshot =
        BackupRuntime.create();

      console.log(
        "[RUNTIME SNAPSHOT]",
        snapshot
      );

    }
  );

  return {

    id:"cloud",

    title:"Cloud Runtime",

    element:root

  };

} 
