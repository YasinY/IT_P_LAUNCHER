"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginEmitListener_1 = require("./impl/LoginEmitListener");
var RenderEmitListener_1 = require("./impl/RenderEmitListener");
var EmitListenerHandler = /** @class */ (function () {
    function EmitListenerHandler(ipcMain, currentWindow) {
        this.registeredListeners = new Array();
        this.ipcMain = ipcMain;
        this.currentWindow = currentWindow;
    }
    //TODO use this with type decorators, it didnt work before..
    EmitListenerHandler.prototype.initialise = function () {
        var _this = this;
        this.registeredListeners.push(new LoginEmitListener_1.LoginEmitListener(this.currentWindow), new RenderEmitListener_1.RenderEmitListener(this.currentWindow));
        this.registeredListeners.forEach(function (listener) {
            _this.ipcMain.on(listener.getEmitTrigger(), listener.onEmit());
        });
    };
    EmitListenerHandler.prototype.getRegisteredListener = function (trigger) {
        return this.registeredListeners.find(function (element) { return element.getEmitTrigger().toLowerCase() === trigger.toLowerCase(); });
    };
    EmitListenerHandler.prototype.getRegisteredListeners = function () {
        return this.registeredListeners;
    };
    return EmitListenerHandler;
}());
exports.EmitListenerHandler = EmitListenerHandler;
//# sourceMappingURL=EmitListenerHandler.js.map