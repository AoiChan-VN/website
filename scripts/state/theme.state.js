import siteConfig
from "../../data/site.config.js";

import themeService
from "../services/theme.service.js";

const STORAGE_KEY =
    "website-theme";

let currentTheme =
    siteConfig.theme.defaultTheme;

const getStoredTheme = () => {
    try {
        return localStorage.getItem(
            STORAGE_KEY
        );
    }

    catch {
        return null;
    }
};

const saveTheme = (
    theme
) => {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            theme
        );
    }

    catch {
        return;
    }
};

const setTheme = (
    theme
) => {
    currentTheme =
        theme;

    themeService.applyTheme(
        currentTheme
    );

    saveTheme(
        currentTheme
    );
};

const toggleTheme = () => {
    const nextTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    setTheme(
        nextTheme
    );
};

const initialize = () => {
    const storedTheme =
        getStoredTheme();

    if (storedTheme) {
        currentTheme =
            storedTheme;
    }

    themeService.applyTheme(
        currentTheme
    );
};

const getTheme = () => {
    return currentTheme;
};

export default Object.freeze({
    initialize,
    setTheme,
    toggleTheme,
    getTheme
}); 
