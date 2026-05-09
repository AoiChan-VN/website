import { createDOM } from './dom.js'
import { clearDOM } from './dom.js'

import { createRevealObserver }
from './observer.js'

const app =
    document.querySelector('#app')

export function render(html) {

    clearDOM(app)

    app.append(
        createDOM(html)
    )

    createRevealObserver()

    window.scrollTo({
        top: 0,
        behavior: 'instant'
    })

}
