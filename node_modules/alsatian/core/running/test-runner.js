"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var alsatian_core_1 = require("../alsatian-core");
var test_plan_1 = require("./test-plan");
var test_set_run_info_1 = require("./test-set-run-info");
var TestRunner = /** @class */ (function () {
    function TestRunner(outputStream) {
        this._onTestCompleteCBs = [];
        // If we were given a TestOutput, use it, otherwise make one
        if (outputStream !== undefined) {
            this._outputStream = outputStream;
        }
        else {
            this._outputStream = new alsatian_core_1.TestOutputStream();
        }
    }
    Object.defineProperty(TestRunner.prototype, "outputStream", {
        get: function () {
            return this._outputStream;
        },
        enumerable: true,
        configurable: true
    });
    TestRunner.prototype.run = function (testSet, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var testPlan, testSetResults, testSetRunInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testPlan = new test_plan_1.TestPlan(testSet);
                        if (testPlan.testItems.length === 0) {
                            throw new Error("no tests to run.");
                        }
                        if (!timeout) {
                            timeout = 500;
                        }
                        testSetResults = new alsatian_core_1.TestSetResults();
                        this._outputStream.emitVersion();
                        this._outputStream.emitPlan(testPlan.testItems.length);
                        testSetRunInfo = new test_set_run_info_1.TestSetRunInfo(testPlan, testSetResults, timeout);
                        return [4 /*yield*/, this._runTests(testSetRunInfo, testSetResults)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Defined the call back function to be called when the test is completed
     */
    TestRunner.prototype.onTestComplete = function (testCompleteCB) {
        this._onTestCompleteCBs.push(testCompleteCB);
    };
    TestRunner.prototype._runTests = function (testSetRunInfo, results) {
        return __awaiter(this, void 0, void 0, function () {
            var testItems, testFixtures, _loop_1, this_1, _i, testFixtures_1, testFixture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testItems = testSetRunInfo.testPlan.testItems;
                        testFixtures = this._getTestFixtures(testItems);
                        _loop_1 = function (testFixture) {
                            var testFixtureItems, testFixtureResults, _loop_2, _i, testFixtureItems_1, testItem;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        testFixtureItems = testItems.filter(function (testItem) { return testItem.testFixture === testFixture; });
                                        return [4 /*yield*/, this_1._setupFixture(testFixture.fixture)];
                                    case 1:
                                        _a.sent();
                                        this_1._outputStream.emitFixture(testFixture);
                                        testFixtureResults = results.addTestFixtureResult(testFixture);
                                        _loop_2 = function (testItem) {
                                            var result;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this_1._getTestItemResult(testItem, testSetRunInfo, testFixtureResults)];
                                                    case 1:
                                                        result = _a.sent();
                                                        this_1._onTestCompleteCBs.forEach(function (onTestCompleteCB) {
                                                            onTestCompleteCB({
                                                                error: result.error,
                                                                outcome: result.outcome,
                                                                test: testItem.test,
                                                                testCase: testItem.testCase,
                                                                testFixture: testItem.testFixture,
                                                                testId: testSetRunInfo.testPlan.testItems.indexOf(testItem) + 1
                                                            });
                                                        });
                                                        this_1._outputStream.emitResult(testItems.indexOf(testItem) + 1, result);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _i = 0, testFixtureItems_1 = testFixtureItems;
                                        _a.label = 2;
                                    case 2:
                                        if (!(_i < testFixtureItems_1.length)) return [3 /*break*/, 5];
                                        testItem = testFixtureItems_1[_i];
                                        return [5 /*yield**/, _loop_2(testItem)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 5: return [4 /*yield*/, this_1._teardownFixture(testFixture.fixture)];
                                    case 6:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, testFixtures_1 = testFixtures;
                        _a.label = 1;
                    case 1:
                        if (!(_i < testFixtures_1.length)) return [3 /*break*/, 4];
                        testFixture = testFixtures_1[_i];
                        return [5 /*yield**/, _loop_1(testFixture)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this._outputStream.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestRunner.prototype._getTestFixtures = function (testItems) {
        return testItems
            .map(function (testItem) { return testItem.testFixture; })
            .filter(function (fixture, index, array) { return array.indexOf(fixture) === index; });
    };
    TestRunner.prototype._getTestItemResult = function (testItem, testSetRunInfo, testFixtureResults) {
        return __awaiter(this, void 0, void 0, function () {
            var error, e_1, testResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, testItem.run(testSetRunInfo.timeout)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        error = e_1;
                        return [3 /*break*/, 3];
                    case 3:
                        testResults = testFixtureResults.testResults.find(function (result) { return result.test === testItem.test; });
                        if (testResults === undefined) {
                            testResults = testFixtureResults.addTestResult(testItem.test);
                        }
                        return [2 /*return*/, testResults.addTestCaseResult(testItem.testCase.caseArguments, error)];
                }
            });
        });
    };
    TestRunner.prototype._setupFixture = function (fixture) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._runFixtureFunctions(fixture, alsatian_core_1.METADATA_KEYS.SETUP_FIXTURE)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestRunner.prototype._teardownFixture = function (fixture) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._runFixtureFunctions(fixture, alsatian_core_1.METADATA_KEYS.TEARDOWN_FIXTURE)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestRunner.prototype._runFixtureFunctions = function (fixture, metadataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var fixtureFunctions, _i, fixtureFunctions_1, fixtureFunction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fixtureFunctions = Reflect.getMetadata(metadataKey, fixture);
                        if (!fixtureFunctions) return [3 /*break*/, 5];
                        _i = 0, fixtureFunctions_1 = fixtureFunctions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < fixtureFunctions_1.length)) return [3 /*break*/, 5];
                        fixtureFunction = fixtureFunctions_1[_i];
                        if (!fixtureFunction.isAsync) return [3 /*break*/, 3];
                        return [4 /*yield*/, fixture[fixtureFunction.propertyKey].call(fixture)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        fixture[fixtureFunction.propertyKey].call(fixture);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TestRunner;
}());
exports.TestRunner = TestRunner;
//# sourceMappingURL=test-runner.js.map