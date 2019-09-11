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
var matchers_1 = require("../matchers");
var stringification_1 = require("../stringification");
var match_error_1 = require("./match-error");
var FunctionCallCountMatchError = /** @class */ (function (_super) {
    __extends(FunctionCallCountMatchError, _super);
    function FunctionCallCountMatchError(actualValue, shouldMatch, expectedCallCount, countType, args) {
        return _super.call(this, FunctionCallCountMatchError._bulidMessage(shouldMatch, expectedCallCount, countType, args), FunctionCallCountMatchError._buildExpectedValue(shouldMatch, expectedCallCount, countType, args), FunctionCallCountMatchError._buildActualValue(actualValue, args)) || this;
    }
    FunctionCallCountMatchError._bulidMessage = function (shouldMatch, expectedCallCount, countType, args) {
        return ("Expected function " + (!shouldMatch ? "not " : "") + "to be called" +
            ("" + (args ? " with " + stringification_1.stringify(args) : "")) +
            ("" + (countType === matchers_1.SpyCallCountType.GreaterThan ? " greater than" : "")) +
            ((countType === matchers_1.SpyCallCountType.LessThan ? " less than" : "") + " " + expectedCallCount + " time") +
            ((expectedCallCount === 1 ? "" : "s") + "."));
    };
    FunctionCallCountMatchError._buildExpectedValue = function (shouldMatch, expectedCallCount, countType, args) {
        return ("function " + (!shouldMatch ? "not " : "") + "to be called" +
            ("" + (args ? " with " + stringification_1.stringify(args) : "")) +
            ("" + (countType === matchers_1.SpyCallCountType.GreaterThan ? " greater than" : "")) +
            ((countType === matchers_1.SpyCallCountType.LessThan ? " less than" : "") + " ") +
            (expectedCallCount + " time" + (expectedCallCount === 1 ? "" : "s") + "."));
    };
    FunctionCallCountMatchError._buildActualValue = function (actualValue, args) {
        return ("function was called" +
            ((args && actualValue.calls.length
                ? " with " +
                    actualValue.calls.map(function (call) { return stringification_1.stringify(call.args); }).join(", ")
                : "") + " ") +
            (actualValue.calls.length + " time" + (actualValue.calls.length === 1 ? "" : "s") + "."));
    };
    return FunctionCallCountMatchError;
}(match_error_1.MatchError));
exports.FunctionCallCountMatchError = FunctionCallCountMatchError;
//# sourceMappingURL=function-call-count-match-error.js.map