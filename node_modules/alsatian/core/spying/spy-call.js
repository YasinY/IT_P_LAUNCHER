"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spying_1 = require("../spying");
var SpyCall = /** @class */ (function () {
    function SpyCall(args) {
        this._args = [];
        this._args = args;
    }
    Object.defineProperty(SpyCall.prototype, "args", {
        get: function () {
            return this._args;
        },
        enumerable: true,
        configurable: true
    });
    SpyCall.prototype.allArgumentsMatch = function () {
        var _this = this;
        var expectedArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expectedArguments[_i] = arguments[_i];
        }
        if (expectedArguments.length !== this._args.length) {
            return false;
        }
        if (expectedArguments.some(function (arg, index) { return !_this._argumentIsAsExpected(_this._args[index], arg); })) {
            return false;
        }
        return true;
    };
    SpyCall.prototype._argumentIsAsExpected = function (actualArgument, expectedArgument) {
        if (expectedArgument === spying_1.Any) {
            return true;
        }
        else if (expectedArgument instanceof spying_1.TypeMatcher) {
            return expectedArgument.test(actualArgument);
        }
        return actualArgument === expectedArgument;
    };
    return SpyCall;
}());
exports.SpyCall = SpyCall;
//# sourceMappingURL=spy-call.js.map