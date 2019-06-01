'use strict';

const getFonts = require('./lib/fonts');

const fontResources = {
    'Google': [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
    ],
};

const factory = globals => {
    return function() {
        function format(host) {
            return `<link rel="dns-prefetch preconnect" href="${host}" crossorigin>`;
        }

        // Add cdn
        const siteSettings = globals.getSiteSettings();
        const hosts = siteSettings['cdn_url'] ?  [siteSettings['cdn_url']] : [];

        // Add font providers
        const providers = Object.keys(getFonts('providerLists', globals.getThemeSettings(), globals.handlebars));

        for (let i = 0; i < providers.length; i++) {
            if (typeof fontResources[providers[i]] !== 'undefined') {
                hosts.push(...fontResources[providers[i]]);
            }
        }

        for (let j = 0; j < hosts.length; j++) {
            hosts[j] = format(hosts[j]);
        }

        return new globals.handlebars.SafeString(hosts.join(''));
    };
};

module.exports = [{
    name: 'resourceHints',
    factory: factory,
}];