"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileRequirer = /** @class */ (function () {
    function FileRequirer() {
    }
    FileRequirer.prototype.require = function (requirePath) {
        return require(requirePath);
    };
    return FileRequirer;
}());
exports.FileRequirer = FileRequirer;
//# sourceMappingURL=file-requirer.js.map