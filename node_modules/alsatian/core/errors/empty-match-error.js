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
var stringification_1 = require("../stringification");
var match_error_1 = require("./match-error");
var EmptyMatchError = /** @class */ (function (_super) {
    __extends(EmptyMatchError, _super);
    function EmptyMatchError(actualValue, shouldMatch) {
        var _this = _super.call(this) || this;
        var value = typeof actualValue === "string" ? actualValue : stringification_1.stringify(actualValue);
        _this.message = "Expected \"" + value + "\" " + (shouldMatch ? "to be" : "not to be") + " empty.";
        _this._actual = actualValue;
        return _this;
    }
    return EmptyMatchError;
}(match_error_1.MatchError));
exports.EmptyMatchError = EmptyMatchError;
//# sourceMappingURL=empty-match-error.js.map