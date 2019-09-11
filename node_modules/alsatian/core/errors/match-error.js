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
var extendo_error_1 = require("extendo-error");
var MatchError = /** @class */ (function (_super) {
    __extends(MatchError, _super);
    function MatchError(message, expectedValue, actualValue) {
        var _this = _super.call(this, message) || this;
        _this._actual = actualValue;
        _this._expected = expectedValue;
        return _this;
    }
    Object.defineProperty(MatchError.prototype, "actual", {
        get: function () {
            return this._actual;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchError.prototype, "expected", {
        get: function () {
            return this._expected;
        },
        enumerable: true,
        configurable: true
    });
    return MatchError;
}(extendo_error_1.default));
exports.MatchError = MatchError;
//# sourceMappingURL=match-error.js.map