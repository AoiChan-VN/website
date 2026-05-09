let observer = null

export function createRevealObserver() {

    if (observer) {

        observer.disconnect()

    }

    observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {

                    return

                }

                entry.target.classList.add(
                    'is-visible'
                )

                observer.unobserve(entry.target)

            })

        },

        {
            threshold: 0.1
        }

    )

    document
        .querySelectorAll('[data-reveal]')
        .forEach(element => {

            observer.observe(element)

        })

}
