"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Glob = require("glob");
var GlobHelper = /** @class */ (function () {
    function GlobHelper() {
    }
    GlobHelper.prototype.isGlob = function (potentialGlob) {
        return Glob.hasMagic(potentialGlob);
    };
    GlobHelper.prototype.resolve = function (glob) {
        return Glob.sync(glob);
    };
    return GlobHelper;
}());
exports.GlobHelper = GlobHelper;
//# sourceMappingURL=glob-helper.js.map