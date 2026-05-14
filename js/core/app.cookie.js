'use strict';

const AOI_COOKIE_KEY = 'aoi-cookie-settings';

export function setCookieSettings(settings) {

    localStorage.setItem(AOI_COOKIE_KEY, JSON.stringify(settings));
}

export function getCookieSettings() {

    const settings = localStorage.getItem(AOI_COOKIE_KEY);

    if (!settings) {
        return {
            thirdPartyBlocked: true
        };
    }

    try {
        return JSON.parse(settings);
    } catch (error) {
        return {
            thirdPartyBlocked: true
        };
    }
}

export function clearCookieSettings() {

    localStorage.removeItem(AOI_ 
