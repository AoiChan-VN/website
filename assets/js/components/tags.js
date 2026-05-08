export function createTags(tags, onClick) {

    const wrapper =
        document.createElement('div');

    wrapper.className =
        'tags-wrapper';

    const allButton =
        document.createElement('button');

    allButton.textContent =
        'All';

    allButton.className =
        'tag-button active';

    allButton.addEventListener(
        'click',
        () => onClick(null)
    );

    wrapper.append(allButton);

    tags.forEach(tag => {

        const button =
            document.createElement('button');

        button.className =
            'tag-button';

        button.textContent =
            tag;

        button.addEventListener(
            'click',
            () => {

                document
                    .querySelectorAll('.tag-button')
                    .forEach(btn =>
                        btn.classList.remove('active')
                    );

                button.classList.add(
                    'active'
                );

                onClick(tag);

            }
        );

        wrapper.append(button);

    });

    return wrapper;

} 
