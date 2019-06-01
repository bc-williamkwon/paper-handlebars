'use strict';

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
            const predicateKey = Object.keys(predicate)[0];
            const arg = args[0];
            if (Array.isArray(arg)) {
                for (let i = 0; i < arg.length; i++) {
                    const element = arg[i];
                    any = common.sameValueZero(element[predicateKey], predicate[predicateKey]);
                    if (any) {
                        break;
                    }
                }
            } else if (common.isObject(arg)) {
                const argIndices = Object.keys(arg);
                for (let i = 0; i < argIndices.length; i++) {
                    const element = arg[argIndices[i]];
                    any = common.sameValueZero(element[predicateKey], predicate[predicateKey]);
                    if (any) {
                        break;
                    }
                }
            }
        } else {
            // DEPRECATED: Moved to #or helper
            // Without options hash, we check all the arguments
            for (let i = 0; i < args.length; i++) {
                any = common.isTruthy(args[i]);
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
