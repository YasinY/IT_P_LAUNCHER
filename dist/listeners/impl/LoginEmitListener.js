"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmitListener_1 = require("../EmitListener");
var LoginEmitListener = /** @class */ (function (_super) {
    __extends(LoginEmitListener, _super);
    function LoginEmitListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginEmitListener.prototype.getDefaultArguments = function () {
        return ["test", "test"];
    };
    LoginEmitListener.prototype.getEmitTrigger = function () {
        return "login";
    };
    LoginEmitListener.prototype.onEmit = function () {
        var _this = this;
        return function (event, username, password) {
            //this.currentWindow.loadFile(global.relativePaths.views + "loading.html")
            console.log("received " + username + " and " + password);
            _super.prototype.getCurrentWindow.call(_this).webContents.once('dom-ready', function () {
                //event.reply('login', false)
                console.log("Sent login!");
            });
        };
    };
    return LoginEmitListener;
}(EmitListener_1.EmitListener));
exports.LoginEmitListener = LoginEmitListener;
//# sourceMappingURL=LoginEmitListener.js.map