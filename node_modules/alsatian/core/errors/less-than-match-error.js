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
var LessThanMatchError = /** @class */ (function (_super) {
    __extends(LessThanMatchError, _super);
    function LessThanMatchError(actualValue, upperLimit, shouldMatch) {
        var _this = _super.call(this, "Expected " + actualValue + " " + (!shouldMatch ? "not " : "") + "to be less than " + upperLimit + ".") || this;
        _this._actual = actualValue;
        _this._expected = "a number " + (shouldMatch ? "" : "not ") + "less than " + upperLimit;
        return _this;
    }
    return LessThanMatchError;
}(match_error_1.MatchError));
exports.LessThanMatchError = LessThanMatchError;
//# sourceMappingURL=less-than-match-error.js.map