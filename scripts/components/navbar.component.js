import siteConfig
from "../../data/site.config.js";

import navigationItems
from "../../data/navigation.data.js";

import themeState
from "../state/theme.state.js";

import audioService
from "../services/audio.service.js";

const createNavLink = (
    item
) => {
    const link =
        document.createElement("a");

    const currentPath =
        window.location.pathname;

    const isActive =
        currentPath.endsWith(
            item.href.replace("./", "")
        ) ||
        (
            item.href === "./index.html" &&
            (
                currentPath === "/" ||
                currentPath.endsWith("/")
            )
        );

    link.className =
        "navbar-link press-feedback";

    if (isActive) {
        link.classList.add(
            "navbar-link-active"
        );
    }

    link.href =
        item.href;

    link.textContent =
        item.label;

    if (item.external) {
        link.target =
            "_blank";

        link.rel =
            "noopener noreferrer";
    }

    link.addEventListener(
        "mouseenter",
        () => {
            audioService.play(
                "hover"
            );
        }
    );

    link.addEventListener(
        "click",
        () => {
            audioService.play(
                "click"
            );
        }
    );

    return link;
};

const createThemeButton = () => {
    const button =
        document.createElement(
            "button"
        );

    button.className =
        "navbar-icon-button press-feedback";

    button.type =
        "button";

    button.setAttribute(
        "aria-label",
        "Toggle Theme"
    );

    const icon =
        document.createElement("span");

    icon.className =
        "navbar-status-dot";

    button.append(icon);

    button.addEventListener(
        "click",
        () => {
            audioService.play(
                "click"
            );

            themeState.toggleTheme();
        }
    );

    return button;
};

const createAudioButton = () => {
    const button =
        document.createElement(
            "button"
        );

    button.className =
        "audio-toggle press-feedback";

    button.type =
        "button";

    button.setAttribute(
        "aria-label",
        "Toggle Audio"
    );

    const indicator =
        document.createElement(
            "span"
        );

    indicator.className =
        "audio-indicator";

    button.append(
        indicator
    );

    const syncState =
        () => {
            const muted =
                audioService.isMuted();

            button.classList.toggle(
                "audio-toggle-muted",
                muted
            );

            indicator.classList.toggle(
                "audio-indicator-muted",
                muted
            );
        };

    button.addEventListener(
        "click",
        () => {
            audioService.toggleMute();

            syncState();
        }
    );

    syncState();

    return button;
};

const createMobileToggle = (
    navigation
) => {
    const button =
        document.createElement(
            "button"
        );

    button.className =
        "navbar-icon-button navbar-mobile-toggle";

    button.type =
        "button";

    button.setAttribute(
        "aria-label",
        "Toggle Navigation"
    );

    const icon =
        document.createElement(
            "img"
        );

    icon.className =
        "navbar-icon";

    icon.src =
        "./assets/icons/menu.svg";

    icon.alt =
        "Menu";

    button.append(
        icon
    );

    button.addEventListener(
        "click",
        () => {
            audioService.play(
                "click"
            );

            const opened =
                navigation.classList.toggle(
                    "navbar-navigation-open"
                );

            icon.src =
                opened
                    ? "./assets/icons/close.svg"
                    : "./assets/icons/menu.svg";
        }
    );

    return button;
};

const createNavbar = () => {
    const navbar =
        document.createElement(
            "nav"
        );

    navbar.className =
        "navbar";

    const backdrop =
        document.createElement(
            "div"
        );

    backdrop.className =
        "navbar-backdrop";

    const glow =
        document.createElement(
            "div"
        );

    glow.className =
        "navbar-glow";

    const noise =
        document.createElement(
            "div"
        );

    noise.className =
        "navbar-noise";

    backdrop.append(
        glow,
        noise
    );

    const brand =
        document.createElement(
            "a"
        );

    brand.className =
        "navbar-brand";

    brand.href =
        "./index.html";

    const logo =
        document.createElement(
            "img"
        );

    logo.className =
        "navbar-logo animate-float";

    logo.src =
        siteConfig.branding.logoMark;

    logo.alt =
        siteConfig.siteName;

    logo.decoding =
        "async";

    const title =
        document.createElement(
            "span"
        );

    title.className =
        "navbar-title";

    title.textContent =
        siteConfig.siteName;

    brand.append(
        logo,
        title
    );

    const navigation =
        document.createElement(
            "div"
        );

    navigation.className =
        "navbar-navigation";

    for (
        const item
        of navigationItems
    ) {
        navigation.append(
            createNavLink(item)
        );
    }

    const actions =
        document.createElement(
            "div"
        );

    actions.className =
        "navbar-actions";

    const status =
        document.createElement(
            "div"
        );

    status.className =
        "navbar-status";

    const dot =
        document.createElement(
            "span"
        );

    dot.className =
        "navbar-status-dot";

    const statusText =
        document.createElement(
            "span"
        );

    statusText.textContent =
        "Online";

    status.append(
        dot,
        statusText
    );

    const divider =
        document.createElement(
            "div"
        );

    divider.className =
        "navbar-divider";

    actions.append(
        status,
        divider,
        createThemeButton(),
        createAudioButton()
    );

    navbar.append(
        backdrop,
        brand,
        navigation,
        actions,
        createMobileToggle(
            navigation
        )
    );

    return navbar;
};

export default createNavbar; 
