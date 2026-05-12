import { Runtime }
from "./runtime.js";

import { FileSystem }
from "./filesystem.js";

import { PackageManager }
from "./packages.js";

import { OfflineKernel }
from "../kernel/offline.js";

export async function boot(){

  FileSystem.initialize();

  PackageManager.initialize();

  await OfflineKernel.initialize();

  Runtime.initialize();

} 
