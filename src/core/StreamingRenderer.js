export class StreamingRenderer {
    #decoder;

    constructor() {
        this.#decoder =
            new TextDecoder();
    }

    async renderStream(
        stream,
        container
    ) {
        const reader =
            stream.getReader();

        let htmlBuffer = '';

        while (true) {
            const {
                done,
                value
            } = await reader.read();

            if (done) {
                break;
            }

            htmlBuffer +=
                this.#decoder.decode(
                    value,
                    {
                        stream: true
                    }
                );

            requestAnimationFrame(() => {
                container.innerHTML =
                    htmlBuffer;
            });
        }
    }
} 
