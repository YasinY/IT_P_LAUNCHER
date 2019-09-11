"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchers_1 = require("../matchers");
var build_expect_1 = require("./build-expect");
function ExpectFunction(actualValue) {
    return new matchers_1.MixedMatcher(actualValue);
}
var EXPECT = build_expect_1.buildExpect(ExpectFunction);
exports.Expect = EXPECT;
//# sourceMappingURL=expect.js.map