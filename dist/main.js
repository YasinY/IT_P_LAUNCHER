"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var EmitListenerHandler_1 = require("./listeners/EmitListenerHandler");
var electron_2 = require("electron");
var currentWindow;
var listenerHandler;
function createWindow() {
    var isWindows = process.platform === "win32";
    currentWindow = getWindowInstance(isWindows);
    currentWindow.loadFile(global.relativePaths.views + "login_screen.html");
    //currentWindow.loadURL("data:text/html;charset-UTF-8," + encodeURIComponent("<b>test</b>"))
    initializeListeners();
    //currentWindow.loadURL("data:text/html;charset=UTF-8," + encodeURIComponent())
    currentWindow.webContents.openDevTools();
    currentWindow.once("ready-to-show", function () {
        currentWindow.show();
    });
    currentWindow.on("closed", function () {
        currentWindow = null;
    });
}
function declareGlobals() {
    var baseDirectory = __dirname + "/";
    global.relativePaths = {
        baseDirectory: path.join(baseDirectory),
        assets: path.join(baseDirectory, "assets/"),
        utilities: path.join(baseDirectory, "assets/", "utilities/"),
        stylesheets: path.join(baseDirectory, "assets/", "css/"),
        images: path.join(baseDirectory, "assets/", "images"),
        renderings: path.join(baseDirectory, "renderings/"),
        utilities_src: path.join(baseDirectory, "utilities/"),
        views: path.join(baseDirectory, "assets/", "html/")
    };
    global.animated = JSON.parse(require("fs").readFileSync(global.relativePaths.utilities + "animations.json", 'utf-8'));
}
function initializeListeners() {
    listenerHandler = new EmitListenerHandler_1.EmitListenerHandler(electron_2.ipcMain, currentWindow);
    console.log("Initializing listeners...");
    listenerHandler.initialise();
}
function initialiseTemplateEngine() {
}
function prepareApplication() {
    console.log("Starting application...");
    declareGlobals();
    initialiseTemplateEngine();
    createWindow();
    console.log("Application should now appear..");
}
function getWindowInstance(windows) {
    return new electron_1.BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        width: 720,
        height: 520,
        show: false,
        backgroundColor: '#2c447e',
        resizable: false,
        title: "IT-Processes",
        frame: !windows,
        titleBarStyle: (!windows) ? "hidden" : "default"
    });
}
if (!electron_1.app.requestSingleInstanceLock()) {
    electron_1.app.quit();
}
else {
    electron_1.app.on("second-instance", function () {
        if (currentWindow == null) {
            electron_1.app.quit();
            return;
        }
        if (currentWindow.isMinimized()) {
            currentWindow.restore();
        }
        else {
            currentWindow.focus();
        }
    });
}
electron_1.app.on("ready", prepareApplication);
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
});
electron_1.app.on("activate", function () {
    if (currentWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map