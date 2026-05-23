import themes
from "../../data/themes.data.js";

const root =
    document.documentElement;

const applyTheme = (
    themeId
) => {
    const theme =
        themes[themeId];

    if (!theme) {
        return;
    }

    root.dataset.theme =
        theme.id;

    const colors =
        theme.colors;

    root.style.setProperty(
        "--color-background",
        colors.background
    );

    root.style.setProperty(
        "--color-background-elevated",
        colors.backgroundElevated
    );

    root.style.setProperty(
        "--color-surface",
        colors.surface
    );

    root.style.setProperty(
        "--color-surface-hover",
        colors.surfaceHover
    );

    root.style.setProperty(
        "--color-border",
        colors.border
    );

    root.style.setProperty(
        "--color-text-primary",
        colors.textPrimary
    );

    root.style.setProperty(
        "--color-text-secondary",
        colors.textSecondary
    );

    root.style.setProperty(
        "--color-text-muted",
        colors.textMuted
    );

    root.style.setProperty(
        "--color-accent",
        colors.accent
    );

    root.style.setProperty(
        "--color-accent-strong",
        colors.accentStrong
    );
};

export default Object.freeze({
    applyTheme
}); 
