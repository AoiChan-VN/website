export const PermissionUI = {

  async request({
    app,
    permission,
    description
  }){

    return new Promise(
      resolve => {

        const overlay =
          document.createElement("div");

        overlay.className =
          "permission-overlay";

        overlay.innerHTML = `
          <div class="permission-modal">

            <div class="permission-header">
              Permission Request
            </div>

            <div class="permission-body">

              <strong>${app}</strong>
              requests access to:

              <br><br>

              <strong>
                ${permission}
              </strong>

              <br><br>

              ${description}

            </div>

            <div class="permission-actions">

              <button
                class="permission-button deny"
              >
                Deny
              </button>

              <button
                class="permission-button allow"
              >
                Allow
              </button>

            </div>

          </div>
        `;

        document.body.appendChild(
          overlay
        );

        const allow =
          overlay.querySelector(
            ".allow"
          );

        const deny =
          overlay.querySelector(
            ".deny"
          );

        allow.addEventListener(
          "click",
          () => {

            overlay.remove();

            resolve(true);

          }
        );

        deny.addEventListener(
          "click",
          () => {

            overlay.remove();

            resolve(false);

          }
        );

      }
    );

  }

}; 
