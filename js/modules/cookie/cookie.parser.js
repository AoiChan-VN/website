// js/modules/cookie/cookie.parser.js

import { AppEvents } from '../../services/app.events.js';

class CookieParser {

    parse(raw = '') {

        if (!raw || typeof raw !== 'string') {
            return {};
        }

        const parsed = {};

        raw.split(';').forEach((entry) => {

            const [key, ...rest] =
                entry.split('=');

            if (!key) {
                return;
            }

            parsed[key.trim()] =
                decodeURIComponent(
                    rest.join('=').trim()
                );
        });

        AppEvents.emit(
            'cookie_parser:parsed',
            {
                size: Object.keys(parsed).length
            }
        );

        return parsed;
    }

    serialize(payload = {}) {

        if (
            typeof payload !== 'object' ||
            payload === null
        ) {
            return '';
        }

        const serialized =
            Object.entries(payload).map(
                ([key, value]) => {

                    return `${key}=${encodeURIComponent(
                        value
                    )}`;
                }
            );

        AppEvents.emit(
            'cookie_parser:serialized',
            {
                size: serialized.length
            }
        );

        return serialized.join('; ');
    }
}

const CookieParserModule =
    new CookieParser();

export {
    CookieParserModule
}; 
