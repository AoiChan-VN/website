export function HeroSection(site) {

    return `

        <section class="hero">

            <div class="container">

                <h1 class="hero__title">
                    ${site.title}
                </h1>

                <p class="hero__description">
                    ${site.description}
                </p>

            </div>

        </section>

    `

} 
