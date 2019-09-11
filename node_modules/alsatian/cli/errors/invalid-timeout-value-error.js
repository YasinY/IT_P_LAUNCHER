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
var InvalidTimeoutValueError = /** @class */ (function (_super) {
    __extends(InvalidTimeoutValueError, _super);
    function InvalidTimeoutValueError(timeoutValue) {
        var _this = _super.call(this) || this;
        _this.message = "Invalid timeout value \"" + timeoutValue + "\" given.";
        return _this;
    }
    return InvalidTimeoutValueError;
}(extendo_error_1.default));
exports.InvalidTimeoutValueError = InvalidTimeoutValueError;
//# sourceMappingURL=invalid-timeout-value-error.js.map