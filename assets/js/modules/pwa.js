export async function initPWA() {

  if (
    !("serviceWorker" in navigator)
  ) {

    return;

  }

  try {

    await navigator.serviceWorker
      .register("./sw.js");

  } catch (error) {

    console.error(
      "[PWA]",
      error
    );

  }

} 
