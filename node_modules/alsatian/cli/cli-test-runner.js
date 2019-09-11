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
var tap_bark_1 = require("tap-bark");
var alsatian_core_1 = require("../core/alsatian-core");
var CliTestRunner = /** @class */ (function () {
    function CliTestRunner(_testRunner) {
        this._testRunner = _testRunner;
        if (!_testRunner) {
            throw new TypeError("_testRunner must not be null or undefined.");
        }
    }
    CliTestRunner.create = function () {
        var outputStream = new alsatian_core_1.TestOutputStream();
        var testRunner = new alsatian_core_1.TestRunner(outputStream);
        return new CliTestRunner(testRunner);
    };
    CliTestRunner.prototype.run = function (userArguments) {
        return __awaiter(this, void 0, void 0, function () {
            var packageJson, testSet, bark, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packageJson = require("../package.json");
                        // if version has been requested then output the current version and exit
                        if (userArguments.versionRequested) {
                            process.stdout.write("alsatian version " + packageJson.version);
                            return [2 /*return*/];
                        }
                        // if help has been requested then output info about using the CLI and exit
                        if (userArguments.helpRequested) {
                            process.stdout.write("\n\n" +
                                "alsatian version " +
                                packageJson.version +
                                "\n" +
                                "=========================\n" +
                                "CLI options\n" +
                                "=========================\n" +
                                "HELP:    --help / -h                      " +
                                "(outputs CLI information)\n" +
                                "VERSION: --version / -v                   " +
                                "(outputs the version of the CLI)\n" +
                                "TAP:     --tap / -T                       " +
                                "(runs alsatian with TAP output)\n" +
                                "TIMEOUT: --timeout [number] / -t [number] " +
                                "(sets the timeout period for tests in milliseconds - default 500)\n" +
                                "\n");
                            return [2 /*return*/];
                        }
                        testSet = alsatian_core_1.TestSet.create();
                        testSet.addTestsFromFiles(userArguments.fileGlobs);
                        if (userArguments.tap) {
                            // if they want TAP output then just write to stdout directly
                            this._testRunner.outputStream.pipe(process.stdout);
                        }
                        else {
                            bark = tap_bark_1.TapBark.create();
                            // pipe the reporter into stdout
                            this._testRunner.outputStream
                                .pipe(bark.getPipeable())
                                .pipe(process.stdout);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._testRunner.run(testSet, userArguments.timeout)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this._handleTestSetRunError(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CliTestRunner.prototype._handleTestSetRunError = function (error) {
        process.stderr.write(error.message + "\n");
        process.exit(1);
    };
    return CliTestRunner;
}());
exports.CliTestRunner = CliTestRunner;
//# sourceMappingURL=cli-test-runner.js.map