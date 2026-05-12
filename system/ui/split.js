export const SplitView = {

  create(left, right){

    const root =
      document.createElement("div");

    root.style.display = "grid";

    root.style.gridTemplateColumns =
      "1fr 1fr";

    root.style.height = "100%";

    root.appendChild(left);

    root.appendChild(right);

    return root;

  }

}; 
