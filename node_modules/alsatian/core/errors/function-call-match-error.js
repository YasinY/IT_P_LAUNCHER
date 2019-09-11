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
var stringification_1 = require("../stringification");
var FunctionCallMatchError = /** @class */ (function (_super) {
    __extends(FunctionCallMatchError, _super);
    function FunctionCallMatchError(actualValue, shouldMatch, args) {
        var _this = _super.call(this, "Expected function " + (!shouldMatch ? "not " : "") + "to be called" +
            ((args ? " with " + stringification_1.stringify(args) : "") + ".")) || this;
        var calls = actualValue.calls;
        _this._actual =
            "function was " + (shouldMatch && !(args && calls.length) ? "not " : "") + "called" +
                ((args && calls.length
                    ? " with " + calls.map(function (call) { return stringification_1.stringify(call.args); }).join(", ")
                    : "") + ".");
        _this._expected =
            "function " + (!shouldMatch ? "not " : "") + "to be called" +
                ((args ? " with " + stringification_1.stringify(args) : "") + ".");
        return _this;
    }
    return FunctionCallMatchError;
}(match_error_1.MatchError));
exports.FunctionCallMatchError = FunctionCallMatchError;
//# sourceMappingURL=function-call-match-error.js.map