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
var TruthyMatchError = /** @class */ (function (_super) {
    __extends(TruthyMatchError, _super);
    function TruthyMatchError(actualValue, shouldMatch) {
        var _this = _super.call(this, "Expected " + stringification_1.stringify(actualValue) + " " + (!shouldMatch ? "not " : "") + "to be truthy.") || this;
        _this._actual = actualValue;
        _this._expected = "" + (shouldMatch ? "truthy" : "falsy");
        return _this;
    }
    return TruthyMatchError;
}(match_error_1.MatchError));
exports.TruthyMatchError = TruthyMatchError;
//# sourceMappingURL=truthy-match-error.js.map