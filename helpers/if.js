'use strict';

const common = require('./lib/common.js');

const factory = globals => {
    return function(lvalue, operator, rvalue, options) {
        let result;

        // Only parameter
        if (common.isOptions(operator)) {
            // If an array is passed as the only parameter
            options = operator;
            if (Array.isArray(lvalue)) {
                result = !!lvalue.length;
            }
            // If an empty object is passed, treat as false
            else if (common.isEmptyObject(lvalue)) {
                result = false;
            }
            // Everything else
            else {
                result = !!lvalue;
            }
        } else {

            if (common.isOptions(rvalue)) {
                // @TODO: this block is for backwards compatibility with 'compare' helper
                // Remove after operator='==' is removed from stencil theme
                options = rvalue;
                rvalue = operator;
                operator = options.hash.operator || "==";
            }

            switch (operator) {
            case '==':
                result = (lvalue == rvalue);
                break;

            case '===':
                result = (lvalue === rvalue);
                break;

            case '!=':
                result = (lvalue != rvalue);
                break;

            case '!==':
                result = (lvalue !== rvalue);
                break;

            case '<':
                result = (lvalue < rvalue);
                break;

            case '>':
                result = (lvalue > rvalue);
                break;

            case '<=':
                result = (lvalue <= rvalue);
                break;

            case '>=':
                result = (lvalue >= rvalue);
                break;

            case 'gtnum':
                if (typeof lvalue === 'string' && typeof(rvalue) === 'string' && !isNaN(lvalue) && !isNaN(rvalue)) {
                    result = parseInt(lvalue) > parseInt(rvalue);
                } else {
                    throw new Error("if gtnum only accepts numbers (as strings)");
                }
                break;

            case 'typeof':
                result = (typeof lvalue === rvalue);
                break;

            default:
                throw new Error("Handlerbars Helper 'if' doesn't know the operator " + operator);
            }
        }

        if (!options.fn || !options.inverse) {
            options.fn = () => true;
            options.inverse = () => false;
        }

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    };
};

module.exports = [{
    name: 'if',
    factory: factory,
}];
