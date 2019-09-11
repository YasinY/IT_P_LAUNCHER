"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spying_1 = require("../spying");
var FunctionSpy = /** @class */ (function () {
    function FunctionSpy() {
        this._calls = [];
    }
    Object.defineProperty(FunctionSpy.prototype, "calls", {
        get: function () {
            return this._calls;
        },
        enumerable: true,
        configurable: true
    });
    FunctionSpy.prototype.callsWithArguments = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.calls.filter(function (call) { return call.allArgumentsMatch.apply(call, args); });
    };
    FunctionSpy.prototype.call = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.calls.push(new spying_1.SpyCall(args));
        var returnValue;
        if (this._fakeFunction) {
            returnValue = this._fakeFunction.apply(this.context, args);
        }
        if (this.hasReturnValue) {
            return this.returnValue;
        }
        return returnValue;
    };
    FunctionSpy.prototype.andReturn = function (returnValue) {
        this.returnValue = returnValue;
        this.hasReturnValue = true;
    };
    FunctionSpy.prototype.andCall = function (fakeFunction) {
        this.isStubbed = true;
        this._fakeFunction = fakeFunction;
    };
    return FunctionSpy;
}());
exports.FunctionSpy = FunctionSpy;
//# sourceMappingURL=function-spy.js.map