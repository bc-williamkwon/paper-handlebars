'use strict';

const common = require('./lib/common.js');

const factory = () => {
    return function(collection, path) {
        const arr = [];
        const properties = path.split('.');

        function pushData(element) {
            const data = properties.length === 1 ? element[path] : common.getProperty(properties, element);
            arr.push(data);
        }

        if (Array.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                pushData(collection[i]);
            } 
        } else if (common.isObject(collection)) {
            const collectionKeys = Object.keys(collection);
            for (let i = 0; i < collectionKeys.length; i++) {
                pushData(collection[collectionKeys[i]]);
            }
        }
        return arr;
    }
};

module.exports = [{
    name: 'pluck',
    factory: factory,
}];
