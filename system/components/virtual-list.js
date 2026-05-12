export class VirtualList{

  constructor({
    container,
    items,
    itemHeight,
    renderItem
  }){

    this.container =
      container;

    this.items =
      items;

    this.itemHeight =
      itemHeight;

    this.renderItem =
      renderItem;

    this.viewport =
      document.createElement("div");

    this.viewport.style.position =
      "relative";

    this.viewport.style.height =
      `${items.length * itemHeight}px`;

    container.innerHTML = "";

    container.appendChild(
      this.viewport
    );

    this.render();

    container.addEventListener(
      "scroll",
      () => {

        this.render();

      }
    );

  }

  render(){

    const scrollTop =
      this.container.scrollTop;

    const height =
      this.container.clientHeight;

    const start =
      Math.floor(
        scrollTop / this.itemHeight
      );

    const visible =
      Math.ceil(
        height / this.itemHeight
      );

    const end =
      start + visible + 6;

    this.viewport.innerHTML = "";

    for(
      let i = start;
      i < end;
      i++
    ){

      const item =
        this.items[i];

      if(!item){
        continue;
      }

      const node =
        this.renderItem(
          item,
          i
        );

      node.style.position =
        "absolute";

      node.style.top =
        `${i * this.itemHeight}px`;

      node.style.left = 0;

      node.style.right = 0;

      this.viewport.appendChild(
        node
      );
    }
  }
} 
