"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var _1 = require("./");
var FunctionSpyMatcher = /** @class */ (function () {
    function FunctionSpyMatcher(spy, expectedArguments) {
        this._expectedArguments = null;
        if (spy === null || spy === undefined) {
            throw new TypeError("spy must not be null or undefined.");
        }
        if (expectedArguments) {
            this._expectedArguments = expectedArguments;
        }
        this._spy = spy;
    }
    FunctionSpyMatcher.prototype.exactly = function (expectedCallCount) {
        this._validateCallCount(expectedCallCount, "expectedCallCount");
        this._throwCallCountError(function (count) { return count !== expectedCallCount; }, expectedCallCount, _1.SpyCallCountType.Exactly, true);
        return new _1.FunctionSpyCallCountMatcher();
    };
    FunctionSpyMatcher.prototype.anythingBut = function (unexpectedCallCount) {
        this._validateCallCount(unexpectedCallCount, "unexpectedCallCount");
        this._throwCallCountError(function (count) { return count === unexpectedCallCount; }, unexpectedCallCount, _1.SpyCallCountType.Exactly, false);
        return new _1.FunctionSpyCallCountMatcher();
    };
    FunctionSpyMatcher.prototype.greaterThan = function (minimumCallCount) {
        this._validateCallCount(minimumCallCount, "minimumCallCount");
        this._throwCallCountError(function (count) { return count <= minimumCallCount; }, minimumCallCount, _1.SpyCallCountType.GreaterThan, true);
        return new _1.FunctionSpyCallCountMatcher();
    };
    FunctionSpyMatcher.prototype.lessThan = function (maximumCallCount) {
        this._validateCallCount(maximumCallCount, "maximumCallCount");
        this._throwCallCountError(function (count) { return count >= maximumCallCount; }, maximumCallCount, _1.SpyCallCountType.LessThan, true);
        return new _1.FunctionSpyCallCountMatcher();
    };
    FunctionSpyMatcher.prototype._validateCallCount = function (callCount, callCountName) {
        if (callCount < 1) {
            throw new TypeError(callCountName + " must be greater than 0.");
        }
    };
    FunctionSpyMatcher.prototype._matchingCallsCount = function () {
        if (this._expectedArguments === null) {
            return this._spy.calls.length;
        }
        return this._matchingArguments();
    };
    FunctionSpyMatcher.prototype._matchingArguments = function () {
        return this._spy.callsWithArguments.apply(this._spy, this._expectedArguments).length;
    };
    FunctionSpyMatcher.prototype._throwCallCountError = function (countIsNotCorrect, callCount, callCountType, shouldMatch) {
        if (countIsNotCorrect(this._matchingCallsCount())) {
            throw new errors_1.FunctionCallCountMatchError(this._spy, shouldMatch, callCount, callCountType, this._expectedArguments);
        }
    };
    return FunctionSpyMatcher;
}());
exports.FunctionSpyMatcher = FunctionSpyMatcher;
//# sourceMappingURL=function-spy-matcher.js.map