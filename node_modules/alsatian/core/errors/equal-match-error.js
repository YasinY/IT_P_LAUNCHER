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
var EqualMatchError = /** @class */ (function (_super) {
    __extends(EqualMatchError, _super);
    function EqualMatchError(actualValue, expectedValue, shouldMatch) {
        var _this = _super.call(this) || this;
        _this.message =
            "Expected " + stringification_1.stringify(actualValue) + " " + (!shouldMatch ? "not " : "") +
                ("to be equal to " + stringification_1.stringify(expectedValue) + ".");
        _this._expected = expectedValue;
        _this._actual = actualValue;
        return _this;
    }
    return EqualMatchError;
}(match_error_1.MatchError));
exports.EqualMatchError = EqualMatchError;
//# sourceMappingURL=equal-match-error.js.map