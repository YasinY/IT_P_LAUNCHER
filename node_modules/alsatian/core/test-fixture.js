"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestFixture = /** @class */ (function () {
    function TestFixture(description) {
        this._tests = [];
        this.focussed = false;
        this.ignored = false;
        this.ignoreReason = "";
        this.fixture = {};
        this.description = description;
    }
    Object.defineProperty(TestFixture.prototype, "tests", {
        get: function () {
            return this._tests;
        },
        enumerable: true,
        configurable: true
    });
    TestFixture.prototype.addTest = function (test) {
        // if the test is already here, don't add it
        if (this.tests.indexOf(test) !== -1) {
            return;
        }
        this.tests.push(test);
    };
    return TestFixture;
}());
exports.TestFixture = TestFixture;
//# sourceMappingURL=test-fixture.js.map