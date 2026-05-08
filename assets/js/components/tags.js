export function createTags(
    tags,
    onClick
) {

    const wrapper =
        document.createElement('div');

    wrapper.className =
        'tags-wrapper';

    let activeButton =
        null;

    function setActive(button) {

        if (activeButton) {

            activeButton.classList.remove(
                'active'
            );

        }

        button.classList.add(
            'active'
        );

        activeButton =
            button;

    }

    const allButton =
        createButton(
            'All',
            () => onClick(null)
        );

    setActive(allButton);

    wrapper.append(allButton);

    tags.forEach(tag => {

        const button =
            createButton(
                tag,
                () => onClick(tag)
            );

        wrapper.append(button);

    });

    return wrapper;

    function createButton(
        label,
        callback
    ) {

        const button =
            document.createElement('button');

        button.type =
            'button';

        button.className =
            'tag-button';

        button.textContent =
            label;

        button.addEventListener(
            'click',
            () => {

                setActive(button);

                callback();

            }
        );

        return button;

    }

}
