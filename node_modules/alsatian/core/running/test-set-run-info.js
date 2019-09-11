"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestSetRunInfo = /** @class */ (function () {
    function TestSetRunInfo(_testPlan, _testSetResults, _timeout) {
        this._testPlan = _testPlan;
        this._testSetResults = _testSetResults;
        this._timeout = _timeout;
    }
    Object.defineProperty(TestSetRunInfo.prototype, "timeout", {
        get: function () {
            return this._timeout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestSetRunInfo.prototype, "testPlan", {
        get: function () {
            return this._testPlan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestSetRunInfo.prototype, "testSetResults", {
        get: function () {
            return this._testSetResults;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestSetRunInfo.prototype, "testPlanItem", {
        get: function () {
            return this._testPlanItem;
        },
        set: function (testPlanItem) {
            if (testPlanItem) {
                this._testPlanItem = testPlanItem;
            }
            else {
                throw new TypeError("testPlanItem must not be null or undefined.");
            }
        },
        enumerable: true,
        configurable: true
    });
    return TestSetRunInfo;
}());
exports.TestSetRunInfo = TestSetRunInfo;
//# sourceMappingURL=test-set-run-info.js.map