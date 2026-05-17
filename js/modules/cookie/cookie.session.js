// js/modules/cookie/cookie.session.js

import { AppEvents } from '../../services/app.events.js';

class CookieSession {

    constructor() {
        this.session = new Map();
    }

    initialize() {

        this.restore();

        this.bindEvents();

        AppEvents.emit(
            'cookie_session:ready'
        );
    }

    bindEvents() {

        AppEvents.on('cookie:set', ({
            name
        }) => {

            this.capture(name);
        });

        AppEvents.on('cookie:remove', ({
            name
        }) => {

            this.remove(name);
        });

        window.addEventListener(
            'beforeunload',
            () => {

                this.flush();
            }
        );
    }

    capture(name) {

        if (!name) {
            return;
        }

        const target =
            document.cookie
                .split(';')
                .find((entry) => {

                    return entry
                        .trim()
                        .startsWith(`${name}=`);
                });

        if (!target) {
            return;
        }

        const [, value] =
            target.split('=');

        this.session.set(name, {
            value:
                decodeURIComponent(
                    value || ''
                ),
            timestamp: Date.now()
        });

        AppEvents.emit(
            'cookie_session:update',
            {
                name
            }
        );
    }

    restore() {

        this.session.forEach(
            (payload, name) => {

                document.cookie =
                    `${name}=${encodeURIComponent(
                        payload.value
                    )}`;
            }
        );
    }

    remove(name) {

        this.session.delete(name);

        AppEvents.emit(
            'cookie_session:remove',
            {
                name
            }
        );
    }

    flush() {

        this.session.clear();

        AppEvents.emit(
            'cookie_session:flush'
        );
    }

    get(name) {

        return this.session.get(name) || null;
    }

    getAll() {

        return Object.fromEntries(
            this.session.entries()
        );
    }
}

const CookieSessionModule =
    new CookieSession();

export {
    CookieSessionModule
}; 
