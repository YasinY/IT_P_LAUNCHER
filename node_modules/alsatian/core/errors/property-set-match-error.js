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
var PropertySetMatchError = /** @class */ (function (_super) {
    __extends(PropertySetMatchError, _super);
    function PropertySetMatchError(actualValue, shouldMatch, value) {
        var _this = _super.call(this, "Expected property " + (!shouldMatch ? "not " : "") + "to be set" +
            ((arguments.length === 3 ? " to " + stringification_1.stringify(value) + "" : "") + ".")) || this;
        var setCalls = actualValue.setCalls;
        _this._actual =
            "property was " + (shouldMatch && !(arguments.length === 3 && setCalls.length)
                ? "not "
                : "") +
                ("set" + (arguments.length === 3 && setCalls.length
                    ? " to " + _this._stringifyArguments(setCalls)
                    : "") + ".");
        _this._expected = "property " + (!shouldMatch ? "not " : "") + "to be set" + (arguments.length === 3 ? " to " + stringification_1.stringify(value) : "") + ".";
        return _this;
    }
    PropertySetMatchError.prototype._stringifyArguments = function (setCalls) {
        return setCalls.map(function (call) { return stringification_1.stringify(call.args[0]); }).join(", ");
    };
    return PropertySetMatchError;
}(match_error_1.MatchError));
exports.PropertySetMatchError = PropertySetMatchError;
//# sourceMappingURL=property-set-match-error.js.map