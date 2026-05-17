// js/services/app.fetch.js

import { AppEvents } from './app.events.js';

class AppFetchService {

    constructor() {
        this.defaultHeaders = {
            'Content-Type':
                'application/json'
        };

        this.timeout = 15000;
    }

    async request(
        url,
        options = {}
    ) {

        if (!url) {
            return null;
        }

        const controller =
            new AbortController();

        const timer =
            setTimeout(() => {

                controller.abort();

            }, this.timeout);

        try {

            const response =
                await fetch(url, {
                    ...options,
                    headers: {
                        ...this.defaultHeaders,
                        ...(options.headers || {})
                    },
                    signal: controller.signal
                });

            clearTimeout(timer);

            AppEvents.emit('fetch:success', {
                url,
                status: response.status
            });

            return response;

        } catch (error) {

            clearTimeout(timer);

            AppEvents.emit('fetch:error', {
                url,
                error
            });

            return null;
        }
    }

    async json(
        url,
        options = {}
    ) {

        const response =
            await this.request(
                url,
                options
            );

        if (!response) {
            return null;
        }

        return response.json();
    }

    async text(
        url,
        options = {}
    ) {

        const response =
            await this.request(
                url,
                options
            );

        if (!response) {
            return null;
        }

        return response.text();
    }

    setTimeout(time) {

        this.timeout = Number(time) || 15000;
    }

    setHeader(key, value) {

        this.defaultHeaders[key] = value;
    }
}

const AppFetch =
    new AppFetchService();

export {
    AppFetch
}; 
