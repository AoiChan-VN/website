import { debounce } from '../modules/debounce.js';

export function createSearch(
    onSearch
) {

    const wrapper =
        document.createElement('div');

    wrapper.className =
        'search-wrapper';

    const input =
        document.createElement('input');

    input.className =
        'search-input';

    input.type =
        'search';

    input.placeholder =
        'Search posts...';

    input.addEventListener(
        'input',
        debounce(event => {

            onSearch(
                event.target.value
            );

        }, 250)
    );

    wrapper.append(input);

    return wrapper;

} 
