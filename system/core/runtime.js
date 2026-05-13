import { MetricsService }
from "../services/metrics.js";

import { DebugConsole }
from "../ui/console.js";

import { KeyboardNavigation }
from "../ui/navigation.js";

import { WidgetEngine }
from "../ui/widgets.js";

import { NativeRuntime }
from "../ui/native-runtime.js";

import { ReleaseRuntime }
from "../release/release.js";

import { InstallRuntime }
from "../release/install-runtime.js";

export const Runtime = {

  async initialize(){

    MetricsService.initialize();

    DebugConsole.initialize();

    KeyboardNavigation.initialize();

    WidgetEngine.initialize();

    await NativeRuntime.initialize();

    await ReleaseRuntime.initialize();

    InstallRuntime.initialize();

  }

};
