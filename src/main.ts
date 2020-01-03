import {app, BrowserWindow, ipcMain} from "electron";
import * as path from "path";
import {EmitListenerHandler} from "./listeners/EmitListenerHandler";
import {LoginRequest} from "./net/request/impl/LoginRequest";
import {Paths} from "./Paths";

global._isEnvironment = function(environment : string) : boolean {
    return process.argv[2] === '--' + environment;
}

let currentWindow: Electron.BrowserWindow;

let listenerHandler : EmitListenerHandler;


function createWindow() {

    let isWindows = process.platform === "win32";
    currentWindow = getWindowInstance(isWindows);
    currentWindow.loadFile(Paths.VIEWS + "login_screen.html")
    //currentWindow.loadURL("data:text/html;charset-UTF-8," + encodeURIComponent("<b>test</b>"))
    initializeListeners()
    //currentWindow.loadURL("data:text/html;charset=UTF-8," + encodeURIComponent())
    currentWindow.webContents.openDevTools();
    currentWindow.once("ready-to-show", () => {
        currentWindow.show()
    })

    currentWindow.on("closed", () => {
        currentWindow = null;
    });
}

app.on('certificate-error', function(event, webContents, url, error,
                                     certificate, callback) {
    console.log("Certificate error!")
    event.preventDefault();
    callback(true);
});
function declareGlobals() {
    let request = new LoginRequest();
    request.perform();
}

function initializeListeners() {
    listenerHandler = new EmitListenerHandler(ipcMain, currentWindow)
    console.log("Initializing listeners...")
    listenerHandler.initialise();
}

function initialiseTemplateEngine() {

}
function prepareApplication() {
    console.log("Starting application...")
    declareGlobals()
    initialiseTemplateEngine()
    createWindow()
    console.log("Application should now appear.." + global._isEnvironment('dev'))

}

function getWindowInstance(windows : boolean) {
    return new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        width: 720,
        height: 520,
        show: false,
        backgroundColor: '#2c447e',
        resizable: false,
        title: "IT-Processes",
        frame: !windows,
        titleBarStyle: (!windows) ? "hidden" : "default"
    })
}

if (!app.requestSingleInstanceLock()) {
    app.quit()
} else {
    app.on("second-instance", () => {
        if(currentWindow == null) {
            app.quit();
            return;
        }
        if (currentWindow.isMinimized()) {
            currentWindow.restore()
        } else {
            currentWindow.focus()
        }
    })
}

app.on("ready", prepareApplication);

app.on("window-all-closed", () => {
    app.quit()
});

app.on("activate", () => {
    if (currentWindow === null) {
        createWindow();
    }
});

