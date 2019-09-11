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
var InvalidArgumentNamesError = /** @class */ (function (_super) {
    __extends(InvalidArgumentNamesError, _super);
    function InvalidArgumentNamesError(argumentNames) {
        var _this = _super.call(this) || this;
        if (argumentNames.length === 1) {
            _this.message = "unrecognised argument " + _this._extractArgumentName(argumentNames[0]) + ".";
        }
        else {
            _this.message = "unrecognised arguments " + argumentNames
                .map(_this._extractArgumentName)
                .join(" and ") + ".";
        }
        return _this;
    }
    InvalidArgumentNamesError.prototype._extractArgumentName = function (argument) {
        return "\"" + argument.replace(/[-]*/, "") + "\"";
    };
    return InvalidArgumentNamesError;
}(extendo_error_1.default));
exports.InvalidArgumentNamesError = InvalidArgumentNamesError;
//# sourceMappingURL=invalid-argument-names-error.js.map