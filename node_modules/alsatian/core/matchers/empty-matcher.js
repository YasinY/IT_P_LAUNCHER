"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var matcher_1 = require("./matcher");
/**
 * Compares types that can be empty e.g. string, object and Array
 */
var EmptyMatcher = /** @class */ (function (_super) {
    __extends(EmptyMatcher, _super);
    function EmptyMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks that an array is empty, a string is empty, or an object literal has no properties
     */
    EmptyMatcher.prototype.toBeEmpty = function () {
        if (null === this.actualValue || undefined === this.actualValue) {
            throw new TypeError("toBeEmpty requires value passed in to Expect not to be null or undefined");
        }
        if (typeof this.actualValue !== "string" &&
            !Array.isArray(this.actualValue) &&
            this.actualValue.constructor !== Object &&
            !(this.actualValue instanceof Map)) {
            throw new TypeError("toBeEmpty requires value passed in to Expect to be an array, string, object literal or map");
        }
        if (this.actualValue instanceof Map) {
            if ((this.actualValue.size === 0) !== this.shouldMatch) {
                throw new errors_1.EmptyMatchError(this.actualValue, this.shouldMatch);
            }
        }
        else {
            var contents = this.actualValue.length
                ? this.actualValue
                : Object.keys(this.actualValue);
            if ((contents.length === 0) !== this.shouldMatch) {
                throw new errors_1.EmptyMatchError(this.actualValue, this.shouldMatch);
            }
        }
    };
    return EmptyMatcher;
}(matcher_1.Matcher));
exports.EmptyMatcher = EmptyMatcher;
//# sourceMappingURL=empty-matcher.js.map