// js/services/app.logger.js

import { AppEvents } from './app.events.js';

class AppLogger {

    constructor() {
        this.logs = [];

        this.maxLogs = 500;
    }

    initialize() {

        AppEvents.emit('logger:ready');
    }

    info(message, payload = null) {

        this.write(
            'info',
            message,
            payload
        );
    }

    warn(message, payload = null) {

        this.write(
            'warn',
            message,
            payload
        );
    }

    error(message, payload = null) {

        this.write(
            'error',
            message,
            payload
        );
    }

    debug(message, payload = null) {

        this.write(
            'debug',
            message,
            payload
        );
    }

    write(
        level,
        message,
        payload = null
    ) {

        const entry = {
            level,
            message,
            payload,
            timestamp: Date.now()
        };

        this.logs.push(entry);

        if (
            this.logs.length >
            this.maxLogs
        ) {

            this.logs.shift();
        }

        console[level]?.(
            `[AOI:${level.toUpperCase()}]`,
            message,
            payload
        );

        AppEvents.emit('logger:write', {
            entry
        });
    }

    getLogs() {

        return [...this.logs];
    }

    clear() {

        this.logs = [];

        AppEvents.emit('logger:clear');
    }
}

const AppLoggerRuntime =
    new AppLogger();

export {
    AppLoggerRuntime
}; 
