// js/services/app.cookies.js

import { AppEvents } from './app.events.js';

class AppCookiesService {

    set(
        name,
        value,
        options = {}
    ) {

        if (!name) {
            return;
        }

        let cookie =
            `${name}=${encodeURIComponent(
                value
            )}`;

        if (options.path) {
            cookie += `; path=${options.path}`;
        }

        if (options.maxAge) {
            cookie += `; max-age=${options.maxAge}`;
        }

        if (options.sameSite) {
            cookie += `; samesite=${options.sameSite}`;
        }

        if (options.secure) {
            cookie += '; secure';
        }

        document.cookie = cookie;

        AppEvents.emit('cookies:set', {
            name
        });
    }

    get(name) {

        const target =
            document.cookie
                .split(';')
                .find((entry) => {

                    return entry
                        .trim()
                        .startsWith(`${name}=`);
                });

        if (!target) {
            return null;
        }

        const [, value] =
            target.split('=');

        return decodeURIComponent(
            value || ''
        );
    }

    remove(name) {

        document.cookie =
            `${name}=; Max-Age=0; path=/`;

        AppEvents.emit('cookies:remove', {
            name
        });
    }

    clear() {

        document.cookie
            .split(';')
            .forEach((entry) => {

                const [name] =
                    entry.split('=');

                document.cookie =
                    `${name.trim()}=; Max-Age=0; path=/`;
            });

        AppEvents.emit('cookies:clear');
    }

    getAll() {

        const cookies = {};

        document.cookie
            .split(';')
            .forEach((entry) => {

                const [name, value] =
                    entry.split('=');

                if (!name) {
                    return;
                }

                cookies[name.trim()] =
                    decodeURIComponent(
                        value || ''
                    );
            });

        return cookies;
    }
}

const AppCookies =
    new AppCookiesService();

export {
    AppCookies
}; 
