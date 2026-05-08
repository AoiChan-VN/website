export function createFragment(
    elements
) {

    const fragment =
        document.createDocumentFragment();

    elements.forEach(element => {

        fragment.append(element);

    });

    return fragment;

} 
