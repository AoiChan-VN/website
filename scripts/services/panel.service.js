const activePanels =
    new Set();

const closeAll = (
    except = null
) => {
    for (
        const panel
        of activePanels
    ) {
        if (
            panel === except
        ) {
            continue;
        }

        panel.classList.remove(
            "product-card-panel-open"
        );

        activePanels.delete(
            panel
        );
    }
};

const open = (
    panel
) => {
    if (!panel) {
        return;
    }

    closeAll(panel);

    panel.classList.add(
        "product-card-panel-open"
    );

    activePanels.add(
        panel
    );
};

const close = (
    panel
) => {
    if (!panel) {
        return;
    }

    panel.classList.remove(
        "product-card-panel-open"
    );

    activePanels.delete(
        panel
    );
};

const toggle = (
    panel
) => {
    if (!panel) {
        return;
    }

    const opened =
        panel.classList.contains(
            "product-card-panel-open"
        );

    if (opened) {
        close(panel);

        return;
    }

    open(panel);
};

document.addEventListener(
    "pointerdown",
    (
        event
    ) => {
        const target =
            event.target;

        if (
            target.closest(
                ".product-card-action-more"
            )
        ) {
            return;
        }

        closeAll();
    }
);

window.addEventListener(
    "blur",
    () => {
        closeAll();
    }
);

export default Object.freeze({
    open,
    close,
    toggle,
    closeAll
}); 
