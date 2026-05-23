import audioService
from "../services/audio.service.js";

import modalService
from "../services/modal.service.js";

import panelService
from "../services/panel.service.js";

const createTag = (
    label
) => {
    const tag =
        document.createElement(
            "span"
        );

    tag.className =
        "product-card-tag";

    tag.textContent =
        label;

    return tag;
};

const createActionButton = ({
    label,
    variant = "secondary"
}) => {
    const button =
        document.createElement(
            "button"
        );

    button.className =
        `button button-${variant} press-feedback`;

    button.type =
        "button";

    button.textContent =
        label;

    return button;
};

const createPanelButton = (
    item
) => {
    const button =
        document.createElement(
            "a"
        );

    button.className =
        "product-card-panel-button";

    button.href =
        item.href || "#";

    button.textContent =
        item.label;

    button.addEventListener(
        "mouseenter",
        () => {
            audioService.play(
                "hover"
            );
        }
    );

    button.addEventListener(
        "click",
        () => {
            audioService.play(
                "click"
            );
        }
    );

    return button;
};

const createPanel = (
    product
) => {
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "product-card-action-more";

    const trigger =
        createActionButton({
            label: "+",
            variant: "ghost"
        });

    trigger.classList.add(
        "button-round"
    );

    const panel =
        document.createElement(
            "div"
        );

    panel.className =
        "product-card-panel";

    for (
        const item
        of product.panel.items
    ) {
        panel.append(
            createPanelButton(
                item
            )
        );
    }

    trigger.addEventListener(
        "click",
        (
            event
        ) => {
            event.stopPropagation();

            audioService.play(
                "open"
            );

            panelService.toggle(
                panel
            );
        }
    );

    wrapper.append(
        trigger,
        panel
    );

    return wrapper;
};

const attachTiltEffect = (
    card
) => {
    const handleMove =
        (
            event
        ) => {
            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const rotateY =
                (
                    (
                        x /
                        rect.width
                    ) -
                    0.5
                ) * 10;

            const rotateX =
                (
                    (
                        y /
                        rect.height
                    ) -
                    0.5
                ) * -10;

            card.style.setProperty(
                "--card-rotate-x",
                `${rotateX}deg`
            );

            card.style.setProperty(
                "--card-rotate-y",
                `${rotateY}deg`
            );
        };

    const reset =
        () => {
            card.style.setProperty(
                "--card-rotate-x",
                "0deg"
            );

            card.style.setProperty(
                "--card-rotate-y",
                "0deg"
            );
        };

    card.addEventListener(
        "mousemove",
        handleMove
    );

    card.addEventListener(
        "mouseleave",
        reset
    );
};

const createProductCard = (
    product
) => {
    const article =
        document.createElement(
            "article"
        );

    article.className =
        "product-card";

    article.dataset.productId =
        product.id;

    attachTiltEffect(
        article
    );

    const frame =
        document.createElement(
            "img"
        );

    frame.className =
        "product-card-frame";

    frame.src =
        product.frame;

    frame.alt =
        "";

    frame.loading =
        "lazy";

    frame.decoding =
        "async";

    const media =
        document.createElement(
            "div"
        );

    media.className =
        "product-card-media";

    const image =
        document.createElement(
            "img"
        );

    image.className =
        "product-card-image";

    image.src =
        product.image;

    image.alt =
        product.title;

    image.loading =
        "lazy";

    image.decoding =
        "async";

    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "product-card-overlay";

    media.append(
        image,
        overlay
    );

    const content =
        document.createElement(
            "div"
        );

    content.className =
        "product-card-content";

    const header =
        document.createElement(
            "div"
        );

    header.className =
        "product-card-header";

    const title =
        document.createElement(
            "h3"
        );

    title.className =
        "product-card-title";

    title.textContent =
        product.title;

    const description =
        document.createElement(
            "p"
        );

    description.className =
        "product-card-description";

    description.textContent =
        product.description;

    const tags =
        document.createElement(
            "div"
        );

    tags.className =
        "product-card-tags";

    for (
        const tag
        of product.tags
    ) {
        tags.append(
            createTag(tag)
        );
    }

    header.append(
        title,
        description,
        tags
    );

    const footer =
        document.createElement(
            "div"
        );

    footer.className =
        "product-card-footer";

    const actions =
        document.createElement(
            "div"
        );

    actions.className =
        "product-card-actions";

    const detailButton =
        createActionButton({
            label:
                product.actions.primary.label,

            variant:
                "primary"
        });

    detailButton.addEventListener(
        "click",
        (
            event
        ) => {
            event.stopPropagation();

            audioService.play(
                "open"
            );

            modalService.open({
                title:
                    product.modal.title,

                description:
                    product.modal.description,

                image:
                    product.modal.image
            });
        }
    );

    const secondaryButton =
        document.createElement(
            "a"
        );

    secondaryButton.className =
        "button button-secondary press-feedback";

    secondaryButton.href =
        product.actions.secondary.href;

    secondaryButton.textContent =
        product.actions.secondary.label;

    secondaryButton.addEventListener(
        "mouseenter",
        () => {
            audioService.play(
                "hover"
            );
        }
    );

    secondaryButton.addEventListener(
        "click",
        () => {
            audioService.play(
                "click"
            );
        }
    );

    actions.append(
        detailButton,
        secondaryButton
    );

    if (
        product.panel?.enabled
    ) {
        actions.append(
            createPanel(product)
        );
    }

    footer.append(
        actions
    );

    const glow =
        document.createElement(
            "div"
        );

    glow.className =
        "product-card-glow";

    content.append(
        header,
        footer
    );

    article.append(
        frame,
        media,
        content,
        glow
    );

    return article;
};

export default createProductCard; 
