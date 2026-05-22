const themes = Object.freeze({
    dark: {
        id: "dark",

        label: "Dark",

        colors: {
            background: "#06070b",
            backgroundElevated:
                "rgba(255,255,255,0.06)",

            surface:
                "rgba(255,255,255,0.08)",

            surfaceHover:
                "rgba(255,255,255,0.12)",

            border:
                "rgba(255,255,255,0.08)",

            textPrimary:
                "#f5f7ff",

            textSecondary:
                "rgba(245,247,255,0.72)",

            textMuted:
                "rgba(245,247,255,0.48)",

            accent:
                "#8ab4ff",

            accentStrong:
                "#a8c6ff"
        }
    },

    light: {
        id: "light",

        label: "Light",

        colors: {
            background: "#f5f7fb",

            backgroundElevated:
                "rgba(255,255,255,0.82)",

            surface:
                "rgba(255,255,255,0.72)",

            surfaceHover:
                "rgba(255,255,255,0.9)",

            border:
                "rgba(0,0,0,0.08)",

            textPrimary:
                "#0b1020",

            textSecondary:
                "rgba(11,16,32,0.72)",

            textMuted:
                "rgba(11,16,32,0.48)",

            accent:
                "#4f7cff",

            accentStrong:
                "#3467ff"
        }
    }
});

export default themes;
