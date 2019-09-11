"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var test_outcome_1 = require("./test-outcome");
var TestCaseResult = /** @class */ (function () {
    function TestCaseResult(test, testCaseArguments, error) {
        if (error === void 0) { error = null; }
        this._test = test;
        this._arguments = testCaseArguments;
        this._error = error;
    }
    Object.defineProperty(TestCaseResult.prototype, "outcome", {
        get: function () {
            if (this._error) {
                if (this._error instanceof errors_1.MatchError) {
                    return test_outcome_1.TestOutcome.Fail;
                }
                return test_outcome_1.TestOutcome.Error;
            }
            if (this._test.ignored) {
                return test_outcome_1.TestOutcome.Skip;
            }
            return test_outcome_1.TestOutcome.Pass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestCaseResult.prototype, "test", {
        get: function () {
            return this._test;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestCaseResult.prototype, "arguments", {
        get: function () {
            return this._arguments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestCaseResult.prototype, "error", {
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    return TestCaseResult;
}());
exports.TestCaseResult = TestCaseResult;
//# sourceMappingURL=test-case-result.js.map