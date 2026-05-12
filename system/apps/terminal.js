export async function createApp(){

  const root =
    document.createElement("div");

  root.className =
    "terminal-app";

  root.innerHTML = `
    <div class="terminal-output">

      <div class="terminal-line">
        Nova Terminal v1.0
      </div>

      <div class="terminal-line">
        Type "help" to list commands.
      </div>

    </div>

    <div class="terminal-input-row">

      <div class="terminal-prefix">
        $
      </div>

      <input
        class="terminal-input"
        type="text"
      >

    </div>
  `;

  const output =
    root.querySelector(
      ".terminal-output"
    );

  const input =
    root.querySelector(
      ".terminal-input"
    );

  input.addEventListener(
    "keydown",
    event => {

      if(event.key !== "Enter"){
        return;
      }

      const value =
        input.value.trim();

      execute(
        value,
        output
      );

      input.value = "";

    }
  );

  return {

    id:"terminal",

    title:"Terminal",

    element:root

  };

}

function execute(
  command,
  output
){

  append(
    output,
    `$ ${command}`
  );

  if(command === "help"){

    append(
      output,
      [
        "help",
        "clear",
        "about",
        "date"
      ].join("\n")
    );

    return;
  }

  if(command === "clear"){

    output.innerHTML = "";

    return;
  }

  if(command === "about"){

    append(
      output,
      "Nova Runtime Environment"
    );

    return;
  }

  if(command === "date"){

    append(
      output,
      new Date().toString()
    );

    return;
  }

  append(
    output,
    `Unknown command: ${command}`
  );

}

function append(
  output,
  value
){

  const line =
    document.createElement("div");

  line.className =
    "terminal-line";

  line.textContent =
    value;

  output.appendChild(line);

  output.scrollTop =
    output.scrollHeight;

} 
