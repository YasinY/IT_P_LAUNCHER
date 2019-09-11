"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.ipcRenderer.on('login', function (event, success) {
    setTimeout(function () {
        if (success) {
            electron_1.remote.getCurrentWindow().loadFile(electron_1.remote.getGlobal("paths").views + "logged_in.html");
        }
        else {
            console.log("Couldnt do request.");
            electron_1.remote.getCurrentWindow().loadFile(electron_1.remote.getGlobal("paths").baseDirectory + "login_screen.html");
        }
    }.bind(_this), 15000);
});
//# sourceMappingURL=loading_renderer.js.map