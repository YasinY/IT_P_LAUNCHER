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
var alsatian_core_1 = require("../alsatian-core");
var errors_1 = require("../errors");
var TestItem = /** @class */ (function () {
    function TestItem(testFixture, test, testCase) {
        if (testFixture === null || testFixture === undefined) {
            throw new TypeError("testFixture must not be null or undefined.");
        }
        if (test === null || test === undefined) {
            throw new TypeError("test must not be null or undefined.");
        }
        if (testCase === null || testCase === undefined) {
            throw new TypeError("testCase must not be null or undefined.");
        }
        this._testFixture = testFixture;
        this._test = test;
        this._testCase = testCase;
    }
    Object.defineProperty(TestItem.prototype, "testCase", {
        get: function () {
            return this._testCase;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestItem.prototype, "test", {
        get: function () {
            return this._test;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestItem.prototype, "testFixture", {
        get: function () {
            return this._testFixture;
        },
        enumerable: true,
        configurable: true
    });
    TestItem.prototype.run = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._test.ignored) return [3 /*break*/, 1];
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, this._setup()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 8]);
                        return [4 /*yield*/, this._runTest(this._test.timeout || timeout)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this._teardown()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this._teardown()];
                    case 7:
                        _a.sent();
                        throw error_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TestItem.prototype._runTest = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            reject(new errors_1.TestTimeoutError(timeout));
                        }, timeout);
                        if (_this._test.isAsync) {
                            _this._execute()
                                .then(resolve)
                                .catch(reject);
                        }
                        else {
                            _this._execute();
                            resolve();
                        }
                    })];
            });
        });
    };
    TestItem.prototype._execute = function () {
        return this._testFixture.fixture[this._test.key].apply(this._testFixture.fixture, this._testCase.caseArguments);
    };
    TestItem.prototype._setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._runFunctionsByMetaDataKey(alsatian_core_1.METADATA_KEYS.SETUP)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestItem.prototype._teardown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._runFunctionsByMetaDataKey(alsatian_core_1.METADATA_KEYS.TEARDOWN)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestItem.prototype._runFunctionsByMetaDataKey = function (metadataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var functions, _i, functions_1, func;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        functions = Reflect.getMetadata(metadataKey, this._testFixture.fixture);
                        if (!functions) return [3 /*break*/, 4];
                        _i = 0, functions_1 = functions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < functions_1.length)) return [3 /*break*/, 4];
                        func = functions_1[_i];
                        return [4 /*yield*/, this._runFunctionFromMetadata(func)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TestItem.prototype._runFunctionFromMetadata = function (funcMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!funcMetadata.isAsync) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._testFixture.fixture[funcMetadata.propertyKey].call(this.testFixture.fixture)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this._testFixture.fixture[funcMetadata.propertyKey].call(this.testFixture.fixture);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TestItem;
}());
exports.TestItem = TestItem;
//# sourceMappingURL=test-item.js.map