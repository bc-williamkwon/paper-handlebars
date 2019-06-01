'use strict';

const _ = require('lodash');
const common = require('./lib/common.js');
/**
 * Yield block if any object within a collection matches supplied predicate
 *
 * @example
 * {{#any items selected=true}} ... {{/any}}
 */
const factory = () => {
    return function(...args) {
        let any;
        // Take the last arg (which is a Handlebars options object) out of args array
        const opts = args.pop();
        const predicate = opts.hash;

        if (!common.isEmptyObject(predicate)) {
            // With options hash, we check the contents of first argument
            any = _.any(args[0], predicate);
        } else {
            // DEPRECATED: Moved to #or helper
            // Without options hash, we check all the arguments
            for (let i = 0; i < args.length; i++) {
                any = common.isTruthy(args[i])
                if (any) {
                    break;
                }
            }
        }

        if (any) {
            return opts.fn(this);
        }

        return opts.inverse(this);
    };
};

module.exports = [{
    name: 'any',
    factory: factory,
}];