"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fail_1 = require("./fail");
function buildExpect(expectFunction) {
    var EXPECT = (function (actualValue) {
        return new expectFunction(actualValue);
    });
    EXPECT.fail = fail_1.fail;
    return EXPECT;
}
exports.buildExpect = buildExpect;
//# sourceMappingURL=build-expect.js.map