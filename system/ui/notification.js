export const NotificationCenter = {

  container:null,

  initialize(){

    this.container =
      document.createElement("div");

    this.container.className =
      "system-notifications";

    document.body.appendChild(
      this.container
    );

  },

  push({
    title,
    description,
    duration=4000
  }){

    const node =
      document.createElement("div");

    node.className =
      "system-notification";

    node.innerHTML = `
      <div class="notification-title">
        ${title}
      </div>

      <div class="notification-description">
        ${description}
      </div>
    `;

    this.container.appendChild(node);

    setTimeout(
      () => {

        node.remove();

      },
      duration
    );

  }

}; 
