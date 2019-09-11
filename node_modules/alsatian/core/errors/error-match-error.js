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
var match_error_1 = require("./match-error");
var ErrorMatchError = /** @class */ (function (_super) {
    __extends(ErrorMatchError, _super);
    function ErrorMatchError(actualError, shouldMatch, expectedErrorType, expectedErrorMessage) {
        var _this = _super.call(this) || this;
        _this._setErrorMessage(actualError, shouldMatch, expectedErrorType, expectedErrorMessage);
        _this._actual =
            "" + (actualError ? actualError.constructor.name + " " : "") +
                ("error was " + (!actualError ? "not " : "") + "thrown") +
                ((actualError ? ' with message "' + actualError.message + '"' : "") + ".");
        _this._expected =
            "" + (expectedErrorType ? expectedErrorType.name + " " : "") +
                ("error " + (!shouldMatch ? "not " : "") + "to be thrown") +
                ((expectedErrorMessage
                    ? ' with message "' + expectedErrorMessage + '"'
                    : "") + ".");
        return _this;
    }
    ErrorMatchError.prototype._setErrorMessage = function (actualError, shouldMatch, expectedErrorType, expectedErrorMessage) {
        if (expectedErrorType || expectedErrorMessage) {
            this._setWrongSpecificErrorMessage(actualError, shouldMatch, expectedErrorType, expectedErrorMessage);
        }
        else {
            if (shouldMatch) {
                this.message = "Expected an error to be thrown but no errors were thrown.";
            }
            else {
                this.message = "Expected an error not to be thrown but an error was thrown.";
            }
        }
    };
    ErrorMatchError.prototype._setWrongSpecificErrorMessage = function (actualError, shouldMatch, expectedErrorType, expectedErrorMessage) {
        if (!expectedErrorType ||
            (expectedErrorMessage &&
                actualError instanceof expectedErrorType &&
                expectedErrorMessage !== actualError.message)) {
            this._setWrongMessageMessage(shouldMatch, expectedErrorMessage);
        }
        else if (expectedErrorMessage === undefined ||
            (actualError &&
                expectedErrorMessage === actualError.message &&
                !(actualError instanceof expectedErrorType))) {
            this._setWrongTypeMessage(actualError, shouldMatch, expectedErrorType);
        }
        else {
            this._setWrongMessageAndTypeMessage(shouldMatch, expectedErrorType, expectedErrorMessage);
        }
    };
    ErrorMatchError.prototype._setWrongMessageMessage = function (shouldMatch, expectedErrorMessage) {
        this.message =
            "Expected an error with message \"" + expectedErrorMessage + "\" " +
                ("to " + (!shouldMatch ? "not " : "") + "have been thrown, ") +
                ("but it was" + (!shouldMatch ? "" : "n't") + ".");
    };
    ErrorMatchError.prototype._setWrongMessageAndTypeMessage = function (shouldMatch, expectedErrorType, expectedErrorMessage) {
        this.message =
            "Expected an error with message \"" + expectedErrorMessage + "\" " +
                ("and type " + expectedErrorType.name + " to " + (!shouldMatch ? "not " : "")) +
                ("have been thrown, but it was" + (!shouldMatch ? "" : "n't") + ".");
    };
    ErrorMatchError.prototype._setWrongTypeMessage = function (actualError, shouldMatch, expectedErrorType) {
        this.message =
            "Expected an error of type " + expectedErrorType.name + " " +
                ("to " + (!shouldMatch ? "not " : "") + "have been thrown, ") +
                ("but " + (shouldMatch
                    ? actualError.name + " was thrown instead"
                    : "it was") + ".");
    };
    return ErrorMatchError;
}(match_error_1.MatchError));
exports.ErrorMatchError = ErrorMatchError;
//# sourceMappingURL=error-match-error.js.map