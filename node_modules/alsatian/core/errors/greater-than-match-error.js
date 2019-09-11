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
var GreaterThanMatchError = /** @class */ (function (_super) {
    __extends(GreaterThanMatchError, _super);
    function GreaterThanMatchError(actualValue, lowerLimit, shouldMatch) {
        var _this = _super.call(this, "Expected " + actualValue + " " + (!shouldMatch ? "not " : "") + "to be greater than " + lowerLimit + ".") || this;
        _this._actual = actualValue;
        _this._expected = "a number " + (shouldMatch ? "" : "not ") + "greater than " + lowerLimit;
        return _this;
    }
    return GreaterThanMatchError;
}(match_error_1.MatchError));
exports.GreaterThanMatchError = GreaterThanMatchError;
//# sourceMappingURL=greater-than-match-error.js.map