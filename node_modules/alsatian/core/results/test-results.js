"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_case_result_1 = require("./test-case-result");
var get_overall_outcome_1 = require("./get-overall-outcome");
var TestResults = /** @class */ (function () {
    function TestResults(_test) {
        this._test = _test;
        this._testCaseResults = [];
    }
    Object.defineProperty(TestResults.prototype, "test", {
        get: function () {
            return this._test;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestResults.prototype, "outcome", {
        get: function () {
            return get_overall_outcome_1.getOverallOutcome(this._testCaseResults);
        },
        enumerable: true,
        configurable: true
    });
    TestResults.prototype.addTestCaseResult = function (args, error) {
        if (error === void 0) { error = null; }
        var testCaseResult = new test_case_result_1.TestCaseResult(this._test, args, error);
        this._testCaseResults.push(testCaseResult);
        return testCaseResult;
    };
    return TestResults;
}());
exports.TestResults = TestResults;
//# sourceMappingURL=test-results.js.map