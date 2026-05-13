import { Runtime }
from "./runtime.js";

import { Registry }
from "./registry.js";

import { FileSystem }
from "./filesystem.js";

import { PackageManager }
from "./packages.js";

import { OfflineKernel }
from "../kernel/offline.js";

import { IsolationRuntime }
from "../security/isolation.js";

export async function secureBoot(){

  FileSystem.initialize();

  PackageManager.initialize();

  await Registry.load();

  await OfflineKernel.initialize();

  IsolationRuntime.create(
    "system"
  );

  Runtime.initialize();

} 
