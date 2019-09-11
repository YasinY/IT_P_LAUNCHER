"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var button = document
    .getElementsByClassName("btn btn-primary btn-lg")
    .item(0);
console.log("test");
button.addEventListener('click', function () {
    //app.getCurrentWindow().loadFile()
    // const username = $('input[type=text]').val();
    //const password = $('input[type=password]').val();
    //ipcRenderer.send('login', "test", "test")
    electron_1.ipcRenderer.send('render', 'loading');
    /// app.getCurrentWindow().loadFile(app.getGlobal("paths").views + "loading.html")
});
//$("logo").attr("src", "./assets/logo.png")
//# sourceMappingURL=login_screen_renderer.js.map