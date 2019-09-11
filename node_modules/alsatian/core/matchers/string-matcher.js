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
var errors_1 = require("../errors");
var container_matcher_1 = require("./container-matcher");
/**
 * Compares strings
 */
var StringMatcher = /** @class */ (function (_super) {
    __extends(StringMatcher, _super);
    function StringMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks that a value conforms to a regular expression
     * @param regex - the regular expression that the actual value should match
     */
    StringMatcher.prototype.toMatch = function (regex) {
        if (regex === null || regex === undefined) {
            throw new TypeError("toMatch regular expression must not be null or undefined.");
        }
        if (typeof this.actualValue !== "string") {
            throw new TypeError("toMatch must only be used to match on strings.");
        }
        if (!regex.test(this.actualValue) === this.shouldMatch) {
            throw new errors_1.RegexMatchError(this.actualValue, regex, this.shouldMatch);
        }
    };
    return StringMatcher;
}(container_matcher_1.ContainerMatcher));
exports.StringMatcher = StringMatcher;
//# sourceMappingURL=string-matcher.js.map