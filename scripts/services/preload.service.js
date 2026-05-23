import siteConfig
from "../../data/site.config.js";

const preloadImage = (
    source
) => {
    return new Promise(
        (
            resolve
        ) => {
            if (!source) {
                resolve();

                return;
            }

            const image =
                new Image();

            image.decoding =
                "async";

            image.loading =
                "eager";

            image.onload =
                () => {
                    resolve();
                };

            image.onerror =
                () => {
                    resolve();
                };

            image.src =
                source;
        }
    );
};

const preloadAudio = (
    source
) => {
    return new Promise(
        (
            resolve
        ) => {
            if (!source) {
                resolve();

                return;
            }

            const audio =
                document.createElement(
                    "audio"
                );

            audio.preload =
                "auto";

            audio.src =
                source;

            audio.addEventListener(
                "canplaythrough",
                () => {
                    resolve();
                },
                {
                    once: true
                }
            );

            audio.addEventListener(
                "error",
                () => {
                    resolve();
                },
                {
                    once: true
                }
            );
        }
    );
};

const preloadFonts = async () => {
    if (
        !("fonts" in document)
    ) {
        return;
    }

    try {
        await Promise.all([
            document.fonts.load(
                "400 16px Inter"
            ),

            document.fonts.load(
                "600 16px Inter"
            )
        ]);
    }

    catch {
        return;
    }
};

const preloadBranding = async () => {
    const tasks = [
        preloadImage(
            siteConfig.branding.logo
        ),

        preloadImage(
            siteConfig.branding.logoMark
        ),

        preloadImage(
            siteConfig.branding.heroBackground
        ),

        preloadImage(
            siteConfig.branding.animeFrame
        )
    ];

    await Promise.all(
        tasks
    );
};

const preloadAudioAssets =
    async () => {
        if (
            !siteConfig.audio.enabled
        ) {
            return;
        }

        const tasks = [
            preloadAudio(
                siteConfig.audio.hoverSound
            ),

            preloadAudio(
                siteConfig.audio.clickSound
            ),

            preloadAudio(
                siteConfig.audio.openSound
            )
        ];

        await Promise.all(
            tasks
        );
    };

const initialize = async () => {
    await Promise.all([
        preloadFonts(),

        preloadBranding(),

        preloadAudioAssets()
    ]);
};

export default Object.freeze({
    initialize
});
