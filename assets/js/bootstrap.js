import { CONFIG }
from "../config.js";

import { loadRegistry }
from "../data/registry.js";

import { createShell }
from "../components/shell.js";

import { createBackground }
from "../components/background.js";

import { initParallax }
from "../utils/parallax.js";

export async function bootstrap(){

  createBackground();

  const items =
    await loadRegistry(
      CONFIG.registryPath
    );

  const shell =
    createShell(items);

  const app =
    document.getElementById(
      "shell"
    );

  app.innerHTML = "";

  app.appendChild(shell);

  initParallax();
} 
