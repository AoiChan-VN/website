export const WidgetEngine = {

  initialize(){

    const layer =
      document.createElement("div");

    layer.className =
      "desktop-widget-layer";

    layer.innerHTML = `
      <section class="desktop-widget">

        <div class="widget-title">
          System
        </div>

        <div class="widget-content">
          Nova Runtime Active
        </div>

      </section>

      <section class="desktop-widget">

        <div class="widget-title">
          Date
        </div>

        <div class="widget-content widget-date">
          --
        </div>

      </section>
    `;

    document.body.appendChild(
      layer
    );

    const date =
      layer.querySelector(
        ".widget-date"
      );

    const update = () => {

      date.textContent =
        new Date().toLocaleDateString();

    };

    update();

    setInterval(update, 1000);

  }

}; 
