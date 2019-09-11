"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var alsatian_core_1 = require("./alsatian-core");
var TestLoader = /** @class */ (function () {
    function TestLoader(_fileRequirer) {
        this._fileRequirer = _fileRequirer;
    }
    TestLoader.prototype.loadTestFixture = function (filePath) {
        var _this = this;
        var testFixtureModule;
        try {
            testFixtureModule = this._fileRequirer.require(filePath);
        }
        catch (e) {
            process.stderr.write("ERROR LOADING FILE: " + filePath + "\n");
            process.stderr.write(e.stack);
            process.exit(1);
            return;
        }
        var testFixtureKeys = Object.keys(testFixtureModule);
        var testFixtures = [];
        var loadFixture = function (constructor, description) {
            var testFixture = _this._loadTestFixture(constructor, description);
            if (testFixture !== null) {
                testFixtures.push(testFixture);
            }
        };
        if (typeof testFixtureModule === "function") {
            // if the default export is class constructor
            loadFixture(testFixtureModule, testFixtureModule.name);
        }
        else {
            // otherwise there are multiple exports and we must handle all of them
            testFixtureKeys
                .filter(function (key) { return typeof testFixtureModule[key] === "function"; })
                .forEach(function (key) { return loadFixture(testFixtureModule[key], key); });
        }
        return testFixtures;
    };
    TestLoader.prototype._loadTestFixture = function (testFixtureConstructor, defaultFixtureDescription) {
        // get test fixture metadata or create new metadata
        // to support not requiring the TestFixture decorator.
        // This functionality will be removed in 2.0.0 where
        // TestFixture decorator will become mandatory
        var testFixture = Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.TEST_FIXTURE, testFixtureConstructor) ||
            new _1.TestFixture(defaultFixtureDescription);
        testFixture.ignored = false;
        if (Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.IGNORE, testFixtureConstructor)) {
            // fixture should be ignored
            testFixture.ignored = true;
            testFixture.ignoreReason = Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.IGNORE_REASON, testFixtureConstructor);
        }
        // create an instance of the test fixture
        testFixture.fixture = new testFixtureConstructor();
        // find all the tests on this test fixture
        var tests = Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.TESTS, testFixture.fixture);
        testFixture.focussed = false;
        if (Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.FOCUS, testFixtureConstructor)) {
            testFixture.focussed = true;
        }
        if (tests === undefined) {
            // no tests on the fixture
            return null;
        }
        tests.forEach(function (test) {
            // the test is ignored if the fixture is, or if it's specifically ignored
            test.ignored = false;
            if (testFixture.ignored ||
                Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.IGNORE, testFixture.fixture, test.key)) {
                test.ignored = true;
                // individual test ignore reasons take precedence over test fixture ignore reasons
                test.ignoreReason =
                    Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.IGNORE_REASON, testFixture.fixture, test.key) || testFixture.ignoreReason;
            }
            test.focussed = false;
            if (Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.FOCUS, testFixture.fixture, test.key)) {
                test.focussed = true;
            }
            test.timeout =
                Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.TIMEOUT, testFixture.fixture, test.key) || null;
            testFixture.addTest(test);
            if (!test.description) {
                test.description = test.key;
            }
            var testCases = Reflect.getMetadata(alsatian_core_1.METADATA_KEYS.TEST_CASES, testFixture.fixture, test.key);
            test.testCases = [];
            if (!testCases) {
                test.testCases.push({ caseArguments: [] });
            }
            else {
                testCases.forEach(function (testCase) {
                    test.testCases.push(testCase);
                });
            }
        });
        return testFixture;
    };
    return TestLoader;
}());
exports.TestLoader = TestLoader;
//# sourceMappingURL=test-loader.js.map