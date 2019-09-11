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
var spying_1 = require("../spying");
var matcher_1 = require("./matcher");
/**
 * Checks whether properties have performed as expected
 */
var PropertyMatcher = /** @class */ (function (_super) {
    __extends(PropertyMatcher, _super);
    function PropertyMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks that a property spy has been set
     */
    PropertyMatcher.prototype.toHaveBeenSet = function () {
        if (this.actualValue instanceof spying_1.PropertySpy === false) {
            throw new TypeError("toHaveBeenSet requires value passed in to Expect to be a PropertySpy.");
        }
        if ((this.actualValue.setCalls.length === 0) === this.shouldMatch) {
            throw new errors_1.PropertySetMatchError(this.actualValue, this.shouldMatch);
        }
    };
    /**
     * Checks that a property spy has been set to a specific value
     * @param value - a value to which the property should be set to
     */
    PropertyMatcher.prototype.toHaveBeenSetTo = function (value) {
        if (this.actualValue instanceof spying_1.PropertySpy === false) {
            throw new TypeError("toHaveBeenSetTo requires value passed in to Expect to be a PropertySpy.");
        }
        if ((this.actualValue.setCalls.filter(function (call) { return call.args[0] === value; })
            .length ===
            0) ===
            this.shouldMatch) {
            throw new errors_1.PropertySetMatchError(this.actualValue, this.shouldMatch, value);
        }
    };
    return PropertyMatcher;
}(matcher_1.Matcher));
exports.PropertyMatcher = PropertyMatcher;
//# sourceMappingURL=property-matcher.js.map