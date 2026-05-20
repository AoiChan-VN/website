export class PerformanceMonitor {
    #frameCount;
    #lastTimestamp;
    #fps;

    constructor() {
        this.#frameCount = 0;
        this.#lastTimestamp =
            performance.now();

        this.#fps = 0;
    }

    start() {
        requestAnimationFrame(
            this.measure
        );
    }

    measure = (timestamp) => {
        this.#frameCount++;

        const elapsed =
            timestamp - this.#lastTimestamp;

        if (elapsed >= 1000) {
            this.#fps = Math.round(
                (this.#frameCount * 1000) /
                    elapsed
            );

            console.info(
                `[Performance] FPS: ${this.#fps}`
            );

            this.#frameCount = 0;

            this.#lastTimestamp =
                timestamp;
        }

        requestAnimationFrame(
            this.measure
        );
    };
} 
