'use strict';

const _ = require('lodash');

/**
 * Yield block only if all args are valid
 *
 * @example
 * {{#all items theme_settings.optionA theme_settings.optionB}} ... {{/all}}
 */
const factory = () => {
    return function(...args) {
        var opts, result;

        // Take the last arg (content) out of testing array
        opts = args.pop();

        // Check if all the args are valid / truthy
        result = _.all(args, function (arg) {
            if (_.isArray(arg)) {
                return !!arg.length;
            }
            // If an empty object is passed, arg is false
            else if (_.isEmpty(arg) && _.isObject(arg)) {
                return false;
            }
            // Everything else
            else {
                return !!arg;
            }
        });

        // If everything was valid, then "all" condition satisfied
        if (result) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    };
};

module.exports = [{
    name: 'all',
    factory: factory,
}];
