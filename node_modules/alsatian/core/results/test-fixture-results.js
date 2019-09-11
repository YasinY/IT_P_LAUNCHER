"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_results_1 = require("./test-results");
var get_overall_outcome_1 = require("./get-overall-outcome");
var TestFixtureResults = /** @class */ (function () {
    function TestFixtureResults(_testFixture) {
        this._testFixture = _testFixture;
        this._testResults = [];
    }
    Object.defineProperty(TestFixtureResults.prototype, "testResults", {
        get: function () {
            return this._testResults;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestFixtureResults.prototype, "fixture", {
        get: function () {
            return this._testFixture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestFixtureResults.prototype, "outcome", {
        get: function () {
            return get_overall_outcome_1.getOverallOutcome(this._testResults);
        },
        enumerable: true,
        configurable: true
    });
    TestFixtureResults.prototype.addTestResult = function (test) {
        var testResults = new test_results_1.TestResults(test);
        this._testResults.push(testResults);
        return testResults;
    };
    return TestFixtureResults;
}());
exports.TestFixtureResults = TestFixtureResults;
//# sourceMappingURL=test-fixture-results.js.map