export function FooterSection(site) {

    return `

        <footer class="footer">

            <div class="container">

                <p>
                    © ${new Date().getFullYear()} ${site.author}
                </p>

            </div>

        </footer>

    `

} 
