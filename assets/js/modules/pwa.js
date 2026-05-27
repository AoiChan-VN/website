export async function initPWA() {

  if (
    !("serviceWorker" in navigator)
  ) {

    return;

  }

  try {

    await navigator.serviceWorker
      .register("./sw.js", {
        scope: "./"
      });

  } catch (error) {

    console.error(
      "[PWA]",
      error
    );

  }

}
