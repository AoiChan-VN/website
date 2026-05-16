// js/modules/browser/browser.security.js

import { AppEvents } from '../../services/app.events.js';

class BrowserSecurity {

    constructor() {
        this.blockedProtocols = [
            'javascript:',
            'data:',
            'file:'
        ];

        this.blockedHosts = new Set();
    }

    initialize() {

        this.bindEvents();

        AppEvents.emit('security:ready');
    }

    bindEvents() {

        AppEvents.on('browser:navigated', ({ url }) => {

            this.validate(url);
        });
    }

    validate(url = '') {

        const normalized =
            String(url).trim().toLowerCase();

        const blocked =
            this.blockedProtocols.some(
                (protocol) => {
                    return normalized.startsWith(protocol);
                }
            );

        if (blocked) {

            AppEvents.emit('security:blocked', {
                url,
                reason: 'protocol'
            });

            return false;
        }

        try {

            const target =
                new URL(url);

            if (
                this.blockedHosts.has(
                    target.hostname
                )
            ) {

                AppEvents.emit('security:blocked', {
                    url,
                    reason: 'host'
                });

                return false;
            }

        } catch (error) {

            AppEvents.emit('security:invalid_url', {
                url
            });

            return false;
        }

        AppEvents.emit('security:passed', {
            url
        });

        return true;
    }

    blockHost(host) {

        if (!host) {
            return;
        }

        this.blockedHosts.add(host);
    }

    unblockHost(host) {

        this.blockedHosts.delete(host);
    }
}

const BrowserSecurityModule =
    new BrowserSecurity();

export {
    BrowserSecurityModule
}; 
