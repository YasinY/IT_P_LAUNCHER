"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_item_1 = require("./test-item");
var TestPlan = /** @class */ (function () {
    function TestPlan(testSet) {
        var _this = this;
        this._testItems = [];
        if (testSet.testFixtures.length === 0) {
            return;
        }
        var testFixtures = testSet.testFixtures;
        // are there any tests or test fixtures focussed
        var focussedTestsOrTestFixtures = testFixtures.filter(function (testFixture) {
            return testFixture.focussed || testFixture.tests.some(function (test) { return test.focussed; });
        }).length > 0;
        testFixtures.forEach(function (testFixture) {
            // run all tests if no tests or fixtures anywhere are focussed
            var testsToRun = testFixture.tests;
            // otherwise if there are tests or fixtures focussed
            if (focussedTestsOrTestFixtures) {
                // if any of the tests are focussed choose just those
                if (testFixture.tests.some(function (test) { return test.focussed; })) {
                    testsToRun = testFixture.tests.filter(function (test) { return test.focussed; });
                }
                else if (testFixture.focussed === false) {
                    // if no tests are focussed and the fixture itself is not focussed run no tests
                    testsToRun = [];
                }
            }
            testsToRun.forEach(function (test) {
                test.testCases.forEach(function (testCase) {
                    _this._testItems.push(new test_item_1.TestItem(testFixture, test, testCase));
                });
            });
        });
    }
    Object.defineProperty(TestPlan.prototype, "testItems", {
        get: function () {
            return this._testItems;
        },
        enumerable: true,
        configurable: true
    });
    return TestPlan;
}());
exports.TestPlan = TestPlan;
//# sourceMappingURL=test-plan.js.map