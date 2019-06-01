'use strict';

const fs = require('fs');
const Path = require('path');

const helpers = [];

// Load helpers
const notDeprecated = fs.readdirSync(Path.join(__dirname, 'helpers'));

for (let i = 0; i < notDeprecated.length; i++) {
    if (!fs.lstatSync(Path.join(__dirname, 'helpers', notDeprecated[i])).isDirectory()) {
        helpers.push(...require('./helpers/' + notDeprecated[i]));
    }
}
const deprecated = fs.readdirSync(Path.join(__dirname, 'helpers', 'deprecated'));
// Load deprecated helpers
for (let j = 0; j < deprecated.length; j++) {
    if (!fs.lstatSync(Path.join(__dirname, 'helpers', 'deprecated', deprecated[j])).isDirectory()) {
        helpers.push(...require('./helpers/deprecated/' + deprecated[j]));
    }
}

// Export full list of helpers
module.exports = helpers;
