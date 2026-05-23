import siteConfig
from "../../data/site.config.js";

const audioMap =
    new Map();

let initialized =
    false;

let muted =
    false;

let unlocked =
    false;

const createAudio = (
    source,
    volume
) => {
    const audio =
        new Audio(source);

    audio.preload =
        "auto";

    audio.volume =
        volume;

    return audio;
};

const unlockAudio = async () => {
    if (unlocked) {
        return;
    }

    unlocked = true;

    for (
        const audio
        of audioMap.values()
    ) {
        try {
            audio.volume = 0;

            await audio.play();

            audio.pause();

            audio.currentTime = 0;

            audio.volume =
                siteConfig.audio.volume;
        }

        catch (error) {
            console.warn(
                "[Audio Unlock]",
                error
            );
        }
    }
};

const initialize = () => {
    if (
        initialized ||
        !siteConfig.audio.enabled
    ) {
        return;
    }

    audioMap.set(
        "hover",
        createAudio(
            siteConfig.audio.hoverSound,
            siteConfig.audio.volume
        )
    );

    audioMap.set(
        "click",
        createAudio(
            siteConfig.audio.clickSound,
            siteConfig.audio.volume
        )
    );

    audioMap.set(
        "open",
        createAudio(
            siteConfig.audio.openSound,
            siteConfig.audio.volume
        )
    );

    window.addEventListener(
        "pointerdown",
        unlockAudio,
        {
            once: true,
            passive: true
        }
    );

    initialized = true;
};

const play = (
    key
) => {
    if (
        muted ||
        !initialized
    ) {
        return;
    }

    const source =
        audioMap.get(key);

    if (!source) {
        return;
    }

    try {
        source.pause();

        source.currentTime = 0;

        void source.play();
    }

    catch (error) {
        console.warn(
            `[Audio Play Error] ${key}`,
            error
        );
    }
};

const toggleMute = () => {
    muted = !muted;

    localStorage.setItem(
        "website-audio-muted",
        String(muted)
    );

    return muted;
};

const isMuted = () => {
    return muted;
};

const restore = () => {
    const saved =
        localStorage.getItem(
            "website-audio-muted"
        );

    muted =
        saved === "true";
};

const destroy = () => {
    for (
        const audio
        of audioMap.values()
    ) {
        audio.pause();

        audio.src = "";
    }

    audioMap.clear();

    initialized = false;
};

restore();

export default Object.freeze({
    initialize,
    play,
    toggleMute,
    isMuted,
    destroy
}); 
