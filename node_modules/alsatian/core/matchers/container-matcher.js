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
var empty_matcher_1 = require("./empty-matcher");
/**
 * Compares container types e.g. string and Array
 */
var ContainerMatcher = /** @class */ (function (_super) {
    __extends(ContainerMatcher, _super);
    function ContainerMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks that a string contains another string or an array contains a specific item
     * @param expectedContent - the string or array item that the value should contain
     */
    ContainerMatcher.prototype.toContain = function (expectedContent) {
        if (this._isValidContainer(this.actualValue)) {
            throw new TypeError("toContain must only be used to check whether strings or arrays contain given contents.");
        }
        if (typeof this.actualValue === "string" &&
            typeof expectedContent !== "string") {
            throw new TypeError("toContain cannot check whether a string contains a non string value.");
        }
        if ((this.actualValue.indexOf(expectedContent) === -1) ===
            this.shouldMatch) {
            throw new errors_1.ContentsMatchError(this.actualValue, expectedContent, this.shouldMatch);
        }
    };
    ContainerMatcher.prototype._isValidContainer = function (value) {
        return value instanceof Array === false && typeof value !== "string";
    };
    return ContainerMatcher;
}(empty_matcher_1.EmptyMatcher));
exports.ContainerMatcher = ContainerMatcher;
//# sourceMappingURL=container-matcher.js.map