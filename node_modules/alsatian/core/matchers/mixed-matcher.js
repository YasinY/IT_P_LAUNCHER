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
var container_matcher_1 = require("./container-matcher");
var empty_matcher_1 = require("./empty-matcher");
var function_matcher_1 = require("./function-matcher");
var function_spy_matcher_1 = require("./function-spy-matcher");
var matcher_1 = require("./matcher");
var number_matcher_1 = require("./number-matcher");
var property_matcher_1 = require("./property-matcher");
var string_matcher_1 = require("./string-matcher");
/**
 * Mixin version of all matchers to allow any function to be used at runtime
 */
var MixedMatcher = /** @class */ (function (_super) {
    __extends(MixedMatcher, _super);
    function MixedMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MixedMatcher;
}(matcher_1.Matcher));
exports.MixedMatcher = MixedMatcher;
applyMixins(MixedMatcher, container_matcher_1.ContainerMatcher, empty_matcher_1.EmptyMatcher, function_matcher_1.FunctionMatcher, function_spy_matcher_1.FunctionSpyMatcher, number_matcher_1.NumberMatcher, property_matcher_1.PropertyMatcher, string_matcher_1.StringMatcher);
function applyMixins(derivedCtor) {
    var baseCtors = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        baseCtors[_i - 1] = arguments[_i];
    }
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
//# sourceMappingURL=mixed-matcher.js.map