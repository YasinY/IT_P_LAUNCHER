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
var spying_1 = require("../spying");
var expose_spy_functions_1 = require("./expose-spy-functions");
var RestorableFunctionSpy = /** @class */ (function (_super) {
    __extends(RestorableFunctionSpy, _super);
    function RestorableFunctionSpy(target, functionName) {
        var _this = _super.call(this) || this;
        _this._originalFunction = target[functionName];
        _this.context = target;
        _this._functionName = functionName;
        _this._target = target;
        target[functionName] = _this.call.bind(_this);
        expose_spy_functions_1.exposeSpyFunctions(target[functionName], _this);
        // expose spy's restore function
        target[functionName].restore = _this.restore.bind(_this);
        return _this;
    }
    RestorableFunctionSpy.prototype.restore = function () {
        this._target[this._functionName] = this._originalFunction;
    };
    RestorableFunctionSpy.prototype.andCallThrough = function () {
        this.isStubbed = false;
    };
    RestorableFunctionSpy.prototype.andStub = function () {
        this.isStubbed = true;
    };
    RestorableFunctionSpy.prototype.call = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var returnValue = _super.prototype.call.apply(this, args);
        if (!this.isStubbed && !this.hasReturnValue) {
            return this._originalFunction.apply(this.context, args);
        }
        return returnValue;
    };
    return RestorableFunctionSpy;
}(spying_1.FunctionSpy));
exports.RestorableFunctionSpy = RestorableFunctionSpy;
//# sourceMappingURL=restorable-function-spy.js.map