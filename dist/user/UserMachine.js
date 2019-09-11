"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserMachine = /** @class */ (function () {
    function UserMachine() {
    }
    UserMachine.is = function (operatingSystem) {
        return this.OS_TYPES.find(function (element) { return operatingSystem.toLowerCase() === element; }) != undefined;
    };
    UserMachine.OS_TYPES = ["darwin", "freebsd", "sunos", "win32"];
    return UserMachine;
}());
exports.UserMachine = UserMachine;
//# sourceMappingURL=UserMachine.js.map