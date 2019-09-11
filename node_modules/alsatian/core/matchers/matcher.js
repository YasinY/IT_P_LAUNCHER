"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var spying_1 = require("../spying");
/**
 * Gives functionality to ensure the outcome of a test is as expected
 */
var Matcher = /** @class */ (function () {
    function Matcher(actualValue) {
        this._shouldMatch = true;
        this._actualValue = actualValue;
    }
    Object.defineProperty(Matcher.prototype, "actualValue", {
        get: function () {
            return this._actualValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matcher.prototype, "shouldMatch", {
        get: function () {
            return this._shouldMatch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matcher.prototype, "not", {
        /**
         * Any subsequent matcher function will be looking for the opposite criteria
         */
        get: function () {
            this._shouldMatch = !this.shouldMatch;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks that a value is identical to another
     * @param expectedValue - the value that will be used to match
     */
    Matcher.prototype.toBe = function (expectedValue) {
        if ((expectedValue !== this._actualValue) === this.shouldMatch) {
            throw new errors_1.ExactMatchError(this._actualValue, expectedValue, this.shouldMatch);
        }
    };
    /**
     * Checks that a value is equal to another (for objects the function will check for deep equality)
     * @param expectedValue - the value that will be used to match
     */
    Matcher.prototype.toEqual = function (expectedValue) {
        var valueMatch;
        if (expectedValue instanceof spying_1.TypeMatcher) {
            valueMatch = expectedValue.test(this._actualValue);
        }
        else if (Buffer.isBuffer(expectedValue)) {
            valueMatch = this._checkBuffersAreEqual(expectedValue, this._actualValue);
        }
        else if (expectedValue instanceof Object) {
            valueMatch = this._checkObjectsAreDeepEqual(expectedValue, this._actualValue);
        }
        else {
            // exclude the double equals in this case from review
            // as this is what we want to do
            // tslint:disable-next-line:triple-equals
            valueMatch = expectedValue == this._actualValue;
        }
        if (valueMatch !== this.shouldMatch) {
            throw new errors_1.EqualMatchError(this._actualValue, expectedValue, this.shouldMatch);
        }
    };
    /**
     * Checks that a value is not undefined
     */
    Matcher.prototype.toBeDefined = function () {
        if ((this._actualValue === undefined) === this.shouldMatch) {
            throw new errors_1.ExactMatchError(this._actualValue, undefined, !this.shouldMatch);
        }
    };
    /**
     * Checks that a value is null
     */
    Matcher.prototype.toBeNull = function () {
        if ((this._actualValue !== null) === this.shouldMatch) {
            throw new errors_1.ExactMatchError(this._actualValue, null, this.shouldMatch);
        }
    };
    /**
     * Checks that a value is equivalent to boolean true
     */
    Matcher.prototype.toBeTruthy = function () {
        if ((this._actualValue && !this.shouldMatch) ||
            (!this._actualValue && this.shouldMatch)) {
            throw new errors_1.TruthyMatchError(this._actualValue, this.shouldMatch);
        }
    };
    Matcher.prototype._checkBuffersAreEqual = function (buffer, other) {
        // Buffer.from() only accepts of type string, Buffer, ArrayBuffer, Array, or Array-like Object.
        if (this._isBufferable(other)) {
            var otherBuffer = Buffer.isBuffer(other)
                ? other
                : Buffer.from(other); // Typings don't know that Buffer.from() can accept ArrayLike<T>
            return buffer.equals(otherBuffer);
        }
        else {
            return false;
        }
    };
    Matcher.prototype._checkObjectsAreDeepEqual = function (objectA, objectB) {
        // if one object is an array and the other is not then they are not equal
        if (Array.isArray(objectA) !== Array.isArray(objectB)) {
            return false;
        }
        // get all the property keys for each object
        var OBJECT_A_KEYS = Object.keys(objectA);
        var OBJECT_B_KEYS = Object.keys(objectB);
        // if they don't have the same amount of properties then clearly not
        if (OBJECT_A_KEYS.length !== OBJECT_B_KEYS.length) {
            return false;
        }
        // check all the properties of each object
        for (var _i = 0, OBJECT_A_KEYS_1 = OBJECT_A_KEYS; _i < OBJECT_A_KEYS_1.length; _i++) {
            var objectAKey = OBJECT_A_KEYS_1[_i];
            // if the property values are not the same
            if (objectA[objectAKey] !== objectB[objectAKey]) {
                // and it's not an object or the objects are not equal
                if (typeof objectA[objectAKey] !== "object" ||
                    this._checkObjectsAreDeepEqual(objectA[objectAKey], objectB[objectAKey]) === false) {
                    // then not deep equal
                    return false;
                }
            }
        }
        // all properties match so all is good
        return true;
    };
    Matcher.prototype._isBufferable = function (obj) {
        return ("string" === typeof obj ||
            Buffer.isBuffer(obj) ||
            Array.isArray(obj) ||
            obj instanceof ArrayBuffer ||
            // ArrayLike<any>
            (null != obj &&
                "object" === typeof obj &&
                obj.hasOwnProperty("length") &&
                "number" === typeof obj.length &&
                (obj.length === 0 || (obj.length > 0 && obj.length - 1 in obj))));
    };
    return Matcher;
}());
exports.Matcher = Matcher;
//# sourceMappingURL=matcher.js.map