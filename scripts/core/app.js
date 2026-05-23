import siteConfig
from "../../data/site.config.js";

import navigationItems
from "../../data/navigation.data.js";

import products
from "../../data/products.data.js";

import createNavbar
from "../components/navbar.component.js";

import createFooter
from "../components/footer.component.js";

import createProductCard
from "../components/card.component.js";

import audioService
from "../services/audio.service.js";

import preloadService
from "../services/preload.service.js";

import responsiveService
from "../services/responsive.service.js";

import interactionService
from "../services/interaction.service.js";

import animationService
from "../services/animation.service.js";

import lazyloadService
from "../services/lazyload.service.js";

import themeState
from "../state/theme.state.js";

const abortController =
    new AbortController();

const cleanupTasks = [];

const renderNavbar = () => {
    const header =
        document.querySelector(
            "[data-component='navbar']"
        );

    if (!header) {
        return;
    }

    header.innerHTML = "";

    header.append(
        createNavbar({
            items:
                navigationItems
        })
    );
};

const renderFooter = () => {
    const footer =
        document.querySelector(
            "[data-component='footer']"
        );

    if (!footer) {
        return;
    }

    footer.innerHTML = "";

    footer.append(
        createFooter()
    );
};

const renderProducts = () => {
    const grid =
        document.getElementById(
            "products-grid"
        );

    if (!grid) {
        return;
    }

    const fragment =
        document.createDocumentFragment();

    for (
        const product
        of products
    ) {
        fragment.append(
            createProductCard(
                product
            )
        );
    }

    grid.replaceChildren(
        fragment
    );
};

const initializeServices = async () => {
    await preloadService.initialize();

    audioService.initialize();

    responsiveService.initialize();

    interactionService.initialize();

    animationService.initialize();

    lazyloadService.initialize();
};

const initializeTheme = () => {
    themeState.initialize();
};

const attachLifecycle = () => {
    const handleVisibility =
        () => {
            if (
                document.hidden
            ) {
                animationService.pause();
            }

            else {
                animationService.resume();
            }
        };

    document.addEventListener(
        "visibilitychange",
        handleVisibility,
        {
            signal:
                abortController.signal
        }
    );

    cleanupTasks.push(
        () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );
        }
    );
};

const initialize = async () => {
    initializeTheme();

    renderNavbar();

    renderFooter();

    renderProducts();

    await initializeServices();

    attachLifecycle();

    document.body.dataset.ready =
        "true";
};

const destroy = () => {
    abortController.abort();

    for (
        const task
        of cleanupTasks
    ) {
        task();
    }

    audioService.destroy();

    responsiveService.destroy();

    interactionService.destroy();

    animationService.destroy();

    lazyloadService.destroy();
};

window.addEventListener(
    "pagehide",
    destroy,
    {
        once: true
    }
);

export default Object.freeze({
    initialize,
    destroy,
    config:
        siteConfig
}); 
