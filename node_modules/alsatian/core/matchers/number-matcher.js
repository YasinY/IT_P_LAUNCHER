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
 * Compares numbers
 */
var NumberMatcher = /** @class */ (function (_super) {
    __extends(NumberMatcher, _super);
    function NumberMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks that a number is less than a given limit
     * @param upperLimit - the number that the number under test should be less than
     */
    NumberMatcher.prototype.toBeLessThan = function (upperLimit) {
        this._validateValues(upperLimit, "toBeLessThan", "upper limit");
        if (this.actualValue < upperLimit !== this.shouldMatch) {
            throw new errors_1.LessThanMatchError(this.actualValue, upperLimit, this.shouldMatch);
        }
    };
    /**
     * Checks that a number is greater than a given limit
     * @param lowerLimit - the number that the number under test should be greater than
     */
    NumberMatcher.prototype.toBeGreaterThan = function (lowerLimit) {
        this._validateValues(lowerLimit, "toBeGreaterThan", "lower limit");
        if (this.actualValue > lowerLimit !== this.shouldMatch) {
            throw new errors_1.GreaterThanMatchError(this.actualValue, lowerLimit, this.shouldMatch);
        }
    };
    NumberMatcher.prototype._validateValues = function (limit, functionName, limitType) {
        if (limit === null || limit === undefined) {
            throw new TypeError(functionName + " " + limitType + " must not be null or undefined.");
        }
        if (typeof this.actualValue !== "number") {
            throw new TypeError(functionName + " can only check numbers.");
        }
    };
    return NumberMatcher;
}(matcher_1.Matcher));
exports.NumberMatcher = NumberMatcher;
//# sourceMappingURL=number-matcher.js.map