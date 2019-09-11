"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var duplicate_cli_argument_error_1 = require("./errors/duplicate-cli-argument-error");
var invalid_argument_names_error_1 = require("./errors/invalid-argument-names-error");
var invalid_timeout_value_error_1 = require("./errors/invalid-timeout-value-error");
var missing_argument_value_error_1 = require("./errors/missing-argument-value-error");
var unused_1 = require("../core/unused");
var remove_item_by_index_1 = require("../core/utils/remove-item-by-index");
var AlsatianCliOptions = /** @class */ (function () {
    function AlsatianCliOptions(args) {
        this._timeout = null;
        this._tap = false;
        this._versionRequested = false;
        this._helpRequested = false;
        args = this._extractTap(args);
        args = this._extractVersionRequested(args);
        args = this._extractHelpRequested(args);
        args = this._extractFileGlobs(args);
        args = this._extractTimeout(args);
        if (args.length > 0) {
            throw new invalid_argument_names_error_1.InvalidArgumentNamesError(args);
        }
    }
    Object.defineProperty(AlsatianCliOptions.prototype, "fileGlobs", {
        get: function () {
            return this._fileGlobs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlsatianCliOptions.prototype, "timeout", {
        get: function () {
            return this._timeout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlsatianCliOptions.prototype, "tap", {
        get: function () {
            return this._tap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlsatianCliOptions.prototype, "versionRequested", {
        get: function () {
            return this._versionRequested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlsatianCliOptions.prototype, "helpRequested", {
        get: function () {
            return this._helpRequested;
        },
        enumerable: true,
        configurable: true
    });
    AlsatianCliOptions.prototype._extractFileGlobs = function (args) {
        var _this = this;
        this._fileGlobs = args.filter(function (value, index) {
            var previousArgument = args[index - 1];
            if ((!previousArgument || previousArgument[0]) !== "-" &&
                value[0] !== "-") {
                return true;
            }
            return false;
        });
        return args.filter(function (value) { return _this._fileGlobs.indexOf(value) === -1; });
    };
    AlsatianCliOptions.prototype._isInvalidTimeoutValue = function (timeoutValue) {
        var timeout = parseInt(timeoutValue, 10);
        return isNaN(timeout) || timeout < 1 || timeout.toString() !== timeoutValue;
    };
    AlsatianCliOptions.prototype._extractTimeout = function (args) {
        var timeoutValue = this._getArgumentValueFromArgumentList(args, "timeout", "t");
        if (timeoutValue !== null) {
            if (this._isInvalidTimeoutValue(timeoutValue)) {
                throw new invalid_timeout_value_error_1.InvalidTimeoutValueError(timeoutValue);
            }
            var timeout = parseInt(timeoutValue, 10);
            this._timeout = timeout;
            var argumentIndex_1 = this._getArgumentIndexFromArgumentList(args, "timeout", "t");
            // filter out the timeout argument and its value
            return args.filter(function (value, index) {
                unused_1.Unused(value);
                return index !== argumentIndex_1 && index !== argumentIndex_1 + 1;
            });
        }
        return args;
    };
    AlsatianCliOptions.prototype._extractTap = function (args) {
        var argumentIndex = this._getArgumentIndexFromArgumentList(args, "tap", "T");
        // if we found the tap argument, we want to enable tap output
        this._tap = argumentIndex !== -1;
        // filter out the tap argument and return the other args
        return args.filter(function (value, index) {
            unused_1.Unused(value);
            return index !== argumentIndex;
        });
    };
    AlsatianCliOptions.prototype._extractVersionRequested = function (args) {
        var versionRequestedIndex = this._getArgumentIndexFromArgumentList(args, "version", "v");
        if (versionRequestedIndex > -1) {
            this._versionRequested = true;
            return remove_item_by_index_1.removeItemByIndex(args, versionRequestedIndex);
        }
        return args;
    };
    AlsatianCliOptions.prototype._extractHelpRequested = function (args) {
        var helpRequestedIndex = this._getArgumentIndexFromArgumentList(args, "help", "h");
        if (helpRequestedIndex > -1) {
            this._helpRequested = true;
            return remove_item_by_index_1.removeItemByIndex(args, helpRequestedIndex);
        }
        return args;
    };
    AlsatianCliOptions.prototype._getArgumentIndexFromArgumentList = function (args, argumentName, argumentShorthand) {
        var matchingArguments = args.filter(function (value) {
            return value === "--" + argumentName || value === "-" + argumentShorthand;
        });
        if (matchingArguments.length === 0) {
            return -1;
        }
        else if (matchingArguments.length > 1) {
            throw new duplicate_cli_argument_error_1.DuplicateCliArgumentError(argumentName);
        }
        return args.indexOf(matchingArguments[0]);
    };
    AlsatianCliOptions.prototype._getArgumentValueFromArgumentList = function (args, argumentName, argumentShorthand) {
        var argumentIndex = this._getArgumentIndexFromArgumentList(args, argumentName, argumentShorthand);
        if (argumentIndex === -1) {
            return null;
        }
        var valueArgument = args[argumentIndex + 1];
        if (valueArgument &&
            (valueArgument[0] !== "-" || !isNaN(parseInt(valueArgument, 10)))) {
            return valueArgument;
        }
        else {
            throw new missing_argument_value_error_1.MissingArgumentValueError(argumentName);
        }
    };
    return AlsatianCliOptions;
}());
exports.AlsatianCliOptions = AlsatianCliOptions;
//# sourceMappingURL=alsatian-cli-options.js.map