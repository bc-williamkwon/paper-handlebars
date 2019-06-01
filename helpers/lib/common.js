function isObject(val) {
    return val !== null && typeof val === 'object';
}

function isOptions(val) {
    return isObject(val) && val.fn;
}

function isString(val) {
    return typeof val === 'string';
}

function isEmptyObject(val) {
    return isObject(val) && Object.keys(val).length === 0;
}

function isTruthy(val) {
    if (Array.isArray(val)) {
        return !!val.length;
    } else if (isEmptyObject(val)) {
        return false;
    } else {
        return !!val;
    }
}

function getProperty(properties, object) {
    let  property = object;    
    for (let i = 0; i < properties.length; i++ ) {
      property = property[properties[i]];
    }
    return property;
}

function sameValueZero(val1, val2) {
    return val1 === val2 || val1 !== val1 && val2 !== val2
}
module.exports = {
    isObject, 
    isOptions, 
    isString, 
    isEmptyObject,
    isTruthy,
    getProperty,
    sameValueZero
};
