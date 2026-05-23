import app from "./app.js";

const bootstrap = async () => {
    try {
        document.documentElement.dataset.theme =
            "dark";

        await app.initialize();
    }

    catch (error) {
        console.error(
            "[Bootstrap Error]",
            error
        );
    }
};

if (
    document.readyState === "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        bootstrap,
        {
            once: true
        }
    );
}

else {
    bootstrap();
} 
