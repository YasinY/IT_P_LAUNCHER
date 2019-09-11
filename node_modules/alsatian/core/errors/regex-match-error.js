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
var RegexMatchError = /** @class */ (function (_super) {
    __extends(RegexMatchError, _super);
    function RegexMatchError(actualValue, expectedRegex, shouldMatch) {
        return _super.call(this, "Expected " + stringification_1.stringify(actualValue) + " " + (!shouldMatch ? "not " : "") + "to conform to " + expectedRegex + ".", expectedRegex, actualValue) || this;
    }
    return RegexMatchError;
}(match_error_1.MatchError));
exports.RegexMatchError = RegexMatchError;
//# sourceMappingURL=regex-match-error.js.map