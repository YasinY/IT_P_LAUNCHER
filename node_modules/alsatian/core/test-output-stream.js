"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var errors_1 = require("./errors");
var results_1 = require("./results");
var stringification_1 = require("./stringification");
var TestOutputStream = /** @class */ (function (_super) {
    __extends(TestOutputStream, _super);
    function TestOutputStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestOutputStream.prototype._read = function () { }; // tslint:disable-line:no-empty
    TestOutputStream.prototype.end = function () {
        this.push(null);
    };
    TestOutputStream.prototype.emitVersion = function () {
        this._writeOut("TAP version 13\n");
    };
    TestOutputStream.prototype.emitPlan = function (testCount) {
        this._writeOut("1.." + testCount + "\n");
    };
    TestOutputStream.prototype.emitFixture = function (fixture) {
        this._writeOut("# FIXTURE " + fixture.description + "\n");
    };
    TestOutputStream.prototype.emitResult = function (testId, result) {
        var outcome = result.outcome;
        var test = result.test;
        var testCaseArguments = result.arguments;
        if (outcome === results_1.TestOutcome.Pass) {
            this._emitPass(testId, test, testCaseArguments);
        }
        else if (outcome === results_1.TestOutcome.Fail || outcome === results_1.TestOutcome.Error) {
            this._emitFail(testId, test, testCaseArguments, result.error);
        }
        else if (outcome === results_1.TestOutcome.Skip) {
            this._emitSkip(testId, test, testCaseArguments);
        }
        else {
            throw new TypeError("Invalid test outcome: " + outcome);
        }
    };
    TestOutputStream.prototype._writeOut = function (message) {
        this.push(message);
    };
    TestOutputStream.prototype._emitPass = function (testId, test, testCaseArguments) {
        var description = this._getTestDescription(test, testCaseArguments);
        this._writeOut("ok " + testId + " " + description + "\n");
    };
    TestOutputStream.prototype._emitSkip = function (testId, test, testCaseArguments) {
        var description = this._getTestDescription(test, testCaseArguments);
        // we only want to use the reason if it's not undefined
        var reasonString = "";
        if (test.ignoreReason !== undefined) {
            reasonString = " " + test.ignoreReason;
        }
        this._writeOut("ok " + testId + " " + description + " # skip" + reasonString + "\n");
    };
    TestOutputStream.prototype._emitFail = function (testId, test, testCaseArguments, error) {
        var description = this._getTestDescription(test, testCaseArguments);
        this._writeOut("not ok " + testId + " " + description + "\n");
        // if it's a match error then log it properly, otherwise log it as unhandled
        if (error instanceof errors_1.MatchError) {
            this._writeMatchErrorOutput(error);
        }
        else {
            this._writeUnhandledErrorOutput(error);
        }
    };
    TestOutputStream.prototype._getTestDescription = function (test, testCaseArguments) {
        if (testCaseArguments === undefined || testCaseArguments.length <= 0) {
            return test.description;
        }
        var formattedArguments = testCaseArguments.map(stringification_1.stringify).join(", ");
        return test.description + " ( " + formattedArguments + " )";
    };
    TestOutputStream.prototype._writeMatchErrorOutput = function (error) {
        var sanitisedMessage = error.message
            .replace(/\\/g, "\\\\")
            .replace(/"/g, '\\"');
        var sanitisedActual = stringification_1.stringify(error.actual);
        var sanitisedExpected = stringification_1.stringify(error.expected);
        this._writeFailure(sanitisedMessage, sanitisedActual, sanitisedExpected);
    };
    TestOutputStream.prototype._writeUnhandledErrorOutput = function (error) {
        this._writeFailure("The test threw an unhandled error.", "an unhandled error", "no unhandled errors to be thrown", error instanceof Error ? error.stack : undefined);
    };
    TestOutputStream.prototype._writeFailure = function (message, actual, expected, stack) {
        var output = " ---\n" +
            '   message: "' +
            message +
            '"\n' +
            "   severity: fail\n" +
            "   data:\n" +
            "     got: " +
            actual +
            "\n" +
            "     expect: " +
            expected +
            "\n";
        if (stack) {
            output = output + "     stack: |\n";
            output =
                output +
                    stack
                        .split("\n")
                        .map(function (l) { return "       " + l; })
                        .join("\n") +
                    "\n";
        }
        output = output + " ...\n";
        this._writeOut(output);
    };
    return TestOutputStream;
}(stream_1.Readable));
exports.TestOutputStream = TestOutputStream;
//# sourceMappingURL=test-output-stream.js.map