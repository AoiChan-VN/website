import siteConfig
from "../../data/site.config.js";

import socials
from "../../data/socials.data.js";

import audioService
from "../services/audio.service.js";

const createSocialLink = (
    social
) => {
    const link =
        document.createElement("a");

    link.className =
        "footer-link press-feedback";

    link.href =
        social.href || "#";

    link.target =
        "_blank";

    link.rel =
        "noopener noreferrer";

    link.textContent =
        social.label;

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

const createFooter = () => {
    const footer =
        document.createElement(
            "footer"
        );

    footer.className =
        "footer-shell";

    const grid =
        document.createElement(
            "div"
        );

    grid.className =
        "footer-grid";

    const brand =
        document.createElement(
            "div"
        );

    brand.className =
        "footer-brand";

    const logo =
        document.createElement(
            "img"
        );

    logo.className =
        "footer-logo";

    logo.src =
        siteConfig.branding.logoMark;

    logo.alt =
        siteConfig.siteName;

    logo.decoding =
        "async";

    const title =
        document.createElement(
            "h3"
        );

    title.className =
        "footer-title";

    title.textContent =
        siteConfig.siteName;

    const description =
        document.createElement(
            "p"
        );

    description.className =
        "footer-description";

    description.textContent =
        "Minimal anime inspired portfolio and product showcase optimized for GitHub Pages and responsive multi-device experiences.";

    brand.append(
        logo,
        title,
        description
    );

    const navigationGroup =
        document.createElement(
            "div"
        );

    navigationGroup.className =
        "footer-group";

    const navigationTitle =
        document.createElement(
            "h4"
        );

    navigationTitle.className =
        "footer-heading";

    navigationTitle.textContent =
        "Navigation";

    const navigationLinks =
        document.createElement(
            "div"
        );

    navigationLinks.className =
        "footer-links";

    const navigationItems = [
        {
            label:
                "Trang chủ",

            href:
                "./index.html"
        },

        {
            label:
                "Sản phẩm",

            href:
                "./pages/products.html"
        },

        {
            label:
                "Docs",

            href:
                "./pages/docs.html"
        }
    ];

    for (
        const item
        of navigationItems
    ) {
        const link =
            document.createElement(
                "a"
            );

        link.className =
            "footer-link press-feedback";

        link.href =
            item.href;

        link.textContent =
            item.label;

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

        navigationLinks.append(
            link
        );
    }

    navigationGroup.append(
        navigationTitle,
        navigationLinks
    );

    const socialGroup =
        document.createElement(
            "div"
        );

    socialGroup.className =
        "footer-group";

    const socialTitle =
        document.createElement(
            "h4"
        );

    socialTitle.className =
        "footer-heading";

    socialTitle.textContent =
        "Social";

    const socialLinks =
        document.createElement(
            "div"
        );

    socialLinks.className =
        "footer-links";

    for (
        const social
        of socials
    ) {
        socialLinks.append(
            createSocialLink(
                social
            )
        );
    }

    socialGroup.append(
        socialTitle,
        socialLinks
    );

    grid.append(
        brand,
        navigationGroup,
        socialGroup
    );

    const bottom =
        document.createElement(
            "div"
        );

    bottom.className =
        "footer-bottom";

    const copyright =
        document.createElement(
            "p"
        );

    copyright.className =
        "footer-copyright";

    copyright.textContent =
        `© ${new Date().getFullYear()} ${siteConfig.siteName}. All rights reserved.`;

    const badge =
        document.createElement(
            "div"
        );

    badge.className =
        "footer-badge";

    badge.textContent =
        "GitHub Pages Ready";

    bottom.append(
        copyright,
        badge
    );

    footer.append(
        grid,
        bottom
    );

    return footer;
};

export default createFooter; 
