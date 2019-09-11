"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spying_1 = require("../spying");
function stringify(data) {
    if (data instanceof Array) {
        return stringifyArray(data);
    }
    if (data instanceof Map) {
        return "Map<" + data.size + ">";
    }
    if (data === spying_1.Any) {
        return "Anything";
    }
    if (data instanceof spying_1.TypeMatcher) {
        return data.stringify();
    }
    if (data instanceof Function) {
        if (data.name) {
            return data.name;
        }
        return "anonymous function";
    }
    if (data === undefined) {
        return "undefined";
    }
    return JSON.stringify(data, createCircularReplacer(data));
}
exports.stringify = stringify;
function createCircularReplacer(rootObject) {
    var cache = [];
    return function (key, value) {
        return circularReplacer(key, value, cache, rootObject);
    };
}
function circularReplacer(key, value, cache, rootObject) {
    // Unused(key);
    if (typeof value === "function") {
        return value.toString();
    }
    return value;
}
function stringifyArray(array) {
    return "[" + array.map(stringify).join(", ") + "]";
}
//# sourceMappingURL=stringify.js.map