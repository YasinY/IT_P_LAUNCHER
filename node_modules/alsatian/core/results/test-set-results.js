"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_fixture_results_1 = require("./test-fixture-results");
var get_overall_outcome_1 = require("./get-overall-outcome");
var TestSetResults = /** @class */ (function () {
    function TestSetResults() {
        this._testFixtureResults = [];
    }
    Object.defineProperty(TestSetResults.prototype, "testFixtureResults", {
        get: function () {
            return this._testFixtureResults;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestSetResults.prototype, "outcome", {
        get: function () {
            return get_overall_outcome_1.getOverallOutcome(this._testFixtureResults);
        },
        enumerable: true,
        configurable: true
    });
    TestSetResults.prototype.addTestFixtureResult = function (testFixture) {
        var testFixtureResult = new test_fixture_results_1.TestFixtureResults(testFixture);
        this._testFixtureResults.push(testFixtureResult);
        return testFixtureResult;
    };
    return TestSetResults;
}());
exports.TestSetResults = TestSetResults;
//# sourceMappingURL=test-set-results.js.map