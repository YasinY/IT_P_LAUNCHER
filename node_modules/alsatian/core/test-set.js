"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var _1 = require("./");
var TestSet = /** @class */ (function () {
    function TestSet(testLoader, globHelper) {
        this._testFixtures = [];
        if (testLoader === null || testLoader === undefined) {
            throw new TypeError("testLoader must not be null or undefined.");
        }
        if (globHelper === null || globHelper === undefined) {
            throw new TypeError("globHelper must not be null or undefined.");
        }
        this._testLoader = testLoader;
        this._globHelper = globHelper;
    }
    TestSet.create = function () {
        var fileRequirer = new _1.FileRequirer();
        var testLoader = new _1.TestLoader(fileRequirer);
        var globHelper = new _1.GlobHelper();
        return new TestSet(testLoader, globHelper);
    };
    Object.defineProperty(TestSet.prototype, "testFixtures", {
        get: function () {
            return this._testFixtures;
        },
        enumerable: true,
        configurable: true
    });
    TestSet.prototype.addTestsFromFiles = function (testsFileLocations) {
        var locationArray;
        if (typeof testsFileLocations === "string") {
            locationArray = [testsFileLocations];
        }
        else {
            locationArray = testsFileLocations;
        }
        this._loadTestFixtures(locationArray);
    };
    TestSet.prototype._loadTestFixtures = function (testFileLocations) {
        var _this = this;
        testFileLocations.forEach(function (testFileLocation) {
            testFileLocation = path.resolve(testFileLocation);
            if (_this._globHelper.isGlob(testFileLocation)) {
                var physicalTestFileLocations = _this._globHelper.resolve(testFileLocation);
                physicalTestFileLocations.forEach(function (physicalTestFileLocation) {
                    _this._testFixtures = _this.testFixtures.concat(_this._testLoader.loadTestFixture(physicalTestFileLocation));
                });
            }
            else {
                _this._testFixtures = _this.testFixtures.concat(_this._testLoader.loadTestFixture(testFileLocation));
            }
        });
    };
    return TestSet;
}());
exports.TestSet = TestSet;
//# sourceMappingURL=test-set.js.map