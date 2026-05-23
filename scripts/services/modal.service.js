import audioService
from "./audio.service.js";

let modalRoot =
    null;

let modalElement =
    null;

let backdropElement =
    null;

let titleElement =
    null;

let imageElement =
    null;

let descriptionElement =
    null;

const lockScroll = () => {
    document.documentElement.style.overflow =
        "hidden";
};

const unlockScroll = () => {
    document.documentElement.style.overflow =
        "";
};

const close = () => {
    if (
        !modalElement ||
        !backdropElement
    ) {
        return;
    }

    modalElement.classList.remove(
        "modal-open"
    );

    backdropElement.classList.remove(
        "modal-backdrop-visible"
    );

    unlockScroll();
};

const createCloseButton = () => {
    const button =
        document.createElement(
            "button"
        );

    button.className =
        "button button-ghost button-round modal-close press-feedback";

    button.type =
        "button";

    button.textContent =
        "×";

    button.addEventListener(
        "click",
        () => {
            audioService.play(
                "click"
            );

            close();
        }
    );

    return button;
};

const build = () => {
    if (modalRoot) {
        return;
    }

    modalRoot =
        document.createElement(
            "div"
        );

    modalRoot.className =
        "modal-root";

    backdropElement =
        document.createElement(
            "div"
        );

    backdropElement.className =
        "modal-backdrop";

    backdropElement.addEventListener(
        "click",
        close
    );

    modalElement =
        document.createElement(
            "div"
        );

    modalElement.className =
        "modal";

    const scroll =
        document.createElement(
            "div"
        );

    scroll.className =
        "modal-scroll";

    const header =
        document.createElement(
            "div"
        );

    header.className =
        "modal-header";

    titleElement =
        document.createElement(
            "h3"
        );

    titleElement.className =
        "modal-title";

    header.append(
        titleElement,
        createCloseButton()
    );

    const body =
        document.createElement(
            "div"
        );

    body.className =
        "modal-body";

    imageElement =
        document.createElement(
            "img"
        );

    imageElement.className =
        "modal-image";

    imageElement.loading =
        "lazy";

    imageElement.decoding =
        "async";

    descriptionElement =
        document.createElement(
            "p"
        );

    descriptionElement.className =
        "modal-description";

    body.append(
        imageElement,
        descriptionElement
    );

    scroll.append(
        header,
        body
    );

    modalElement.append(
        scroll
    );

    modalRoot.append(
        backdropElement,
        modalElement
    );

    document.body.append(
        modalRoot
    );

    window.addEventListener(
        "keydown",
        (
            event
        ) => {
            if (
                event.key === "Escape"
            ) {
                close();
            }
        }
    );
};

const open = ({
    title,
    description,
    image
}) => {
    build();

    titleElement.textContent =
        title;

    descriptionElement.textContent =
        description;

    imageElement.src =
        image;

    imageElement.alt =
        title;

    backdropElement.classList.add(
        "modal-backdrop-visible"
    );

    modalElement.classList.add(
        "modal-open"
    );

    lockScroll();

    audioService.play(
        "open"
    );
};

export default Object.freeze({
    open,
    close
}); 
