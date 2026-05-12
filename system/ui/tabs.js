export class Tabs{

  constructor(container){

    this.container =
      container;

    this.tabs = [];

    this.active = null;
  }

  add({
    title,
    content
  }){

    const id =
      crypto.randomUUID();

    this.tabs.push({
      id,
      title,
      content
    });

    this.active = id;

    this.render();
  }

  render(){

    this.container.innerHTML = `
      <div class="tabs-header"></div>

      <div class="tabs-body"></div>
    `;

    const header =
      this.container.querySelector(
        ".tabs-header"
      );

    const body =
      this.container.querySelector(
        ".tabs-body"
      );

    this.tabs.forEach(
      tab => {

        const button =
          document.createElement(
            "button"
          );

        button.textContent =
          tab.title;

        button.addEventListener(
          "click",
          () => {

            this.active =
              tab.id;

            this.render();

          }
        );

        header.appendChild(button);

        if(
          tab.id === this.active
        ){

          body.appendChild(
            tab.content
          );

        }

      }
    );

  }

} 
