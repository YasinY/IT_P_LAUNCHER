"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringification_1 = require("../stringification");
var TypeMatcher = /** @class */ (function () {
    function TypeMatcher(type) {
        var _this = this;
        this._testers = [];
        if (type === null || type === undefined) {
            throw new TypeError("type must not be null or undefined");
        }
        this._type = type;
        this._testers.push({
            stringify: function () { return "Any " + _this.type.name; },
            test: function (value) {
                if (type === String) {
                    return typeof value === "string" || value instanceof _this._type;
                }
                else if (type === Number) {
                    return typeof value === "number" || value instanceof _this._type;
                }
                else if (type === Boolean) {
                    return typeof value === "boolean" || value instanceof _this._type;
                }
                else {
                    return value instanceof _this._type;
                }
            }
        });
    }
    Object.defineProperty(TypeMatcher.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    TypeMatcher.prototype.test = function (value) {
        return this._testers.every(function (tester) { return tester.test(value); });
    };
    TypeMatcher.prototype.stringify = function () {
        return this._testers.map(function (tester) { return tester.stringify(); }).join(" and ");
    };
    TypeMatcher.prototype.thatMatches = function (first, second) {
        if (null === first || undefined === first) {
            throw new TypeError("thatMatches requires none-null or non-undefined argument");
        }
        if (typeof first === "string") {
            return this._matchesKeyAndValue(first, second);
        }
        if (typeof first === "function") {
            return this._matchesDelegate(first);
        }
        if (typeof first === "object") {
            return this._matchesObjectLiteral(first);
        }
        throw new Error("Invalid arguments");
    };
    /* tslint:enable:unified-signatures */
    TypeMatcher.prototype._matchesKeyAndValue = function (key, value) {
        this._testers.push({
            stringify: function () { return "with property '" + key + "' equal to '" + stringification_1.stringify(value) + "'"; },
            test: function (v) {
                if (Object.getOwnPropertyNames(v).indexOf(key) < 0) {
                    return false;
                }
                return v[key] === value;
            }
        });
        return this;
    };
    TypeMatcher.prototype._matchesDelegate = function (delegate) {
        this._testers.push({
            stringify: function () { return "matches '" + delegate.toString() + "'"; },
            test: function (v) { return delegate(v); }
        });
        return this;
    };
    TypeMatcher.prototype._matchesObjectLiteral = function (properties) {
        this._testers.push({
            stringify: function () { return "matches '" + stringification_1.stringify(properties) + "'"; },
            test: function (v) {
                var targetKeys = Object.getOwnPropertyNames(v);
                return Object.getOwnPropertyNames(properties).every(function (key) {
                    if (targetKeys.indexOf(key) < 0) {
                        return false;
                    }
                    return v[key] === properties[key];
                });
            }
        });
        return this;
    };
    return TypeMatcher;
}());
exports.TypeMatcher = TypeMatcher;
//# sourceMappingURL=type-matcher.js.map