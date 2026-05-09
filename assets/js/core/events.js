import { navigate } from './router.js'

export function bindRouterLinks() {

    document.addEventListener('click', event => {

        const link = event.target.closest('[data-link]')

        if (!link) {

            return

        }

        event.preventDefault()

        navigate(link.getAttribute('href'))

    })

} 
