export function createHero() {

    const hero =
        document.createElement('section');

    hero.className =
        'hero-section';

    hero.innerHTML = `
        <div class="container hero-container">

            <div class="hero-content">

                <h1>
                    Pure Vanilla Architecture
                </h1>

                <p>
                    Fast. Clean. Long-term.
                </p>

            </div>

        </div>
    `;

    return hero;

} 
