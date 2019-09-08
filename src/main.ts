import {app, BrowserWindow} from "electron";
import * as path from "path";
import {EmitListenerHandler} from "./listeners/EmitListenerHandler";
import {ipcMain} from "electron";


let currentWindow: Electron.BrowserWindow;

function createWindow() {
    currentWindow = getWindowInstance();
    initializeListeners()
    currentWindow.loadFile(global.relativePaths.views  + "login_screen.html");
    currentWindow.webContents.openDevTools();
    currentWindow.once("ready-to-show", () => {
        currentWindow.show()
    })

    currentWindow.on("closed", () => {
        currentWindow = null;
    });
}

function declareGlobals() {
    const baseDirectory = __dirname + "/"
    global.relativePaths = {
        baseDirectory: path.join(baseDirectory),
        assets: path.join(baseDirectory, "assets/"),
        utilities: path.join(baseDirectory, "assets/", "utilities/"),
        stylesheets: path.join(baseDirectory, "assets/", "css/"),
        views: path.join(baseDirectory, "assets/", "html/"),
        images: path.join(baseDirectory, "assets/", "images"),
        renderings: path.join(baseDirectory, "renderings/"),
        utilities_src: path.join(baseDirectory, "utilities/"),
        templates: path.join(baseDirectory, "assets/", "compiledTemplates/")
    };
    global.animated = JSON.parse(require("fs").readFileSync(global.relativePaths.utilities + "animations.json", 'utf-8'))

    console.log("Saved global!")
    console.log(global.animated)
}

function initializeListeners() {
    console.log("Initializing listeners...")
    let listenerHandler = new EmitListenerHandler(ipcMain, currentWindow);
    listenerHandler.initialise();
}

function initialiseTemplateEngine() {

}
function prepareApplication() {
    console.log("Starting application...")
    initialiseTemplateEngine()
    declareGlobals()
    createWindow()
    console.log("Application should now appear..")
}

function getWindowInstance() {
    return new BrowserWindow({

        width: 720,
        height: 520,
        show: false,
        backgroundColor: '#2c447e',
        resizable: false,
        title: "IT-Processes",
        frame: false
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
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (currentWindow === null) {
        createWindow();
    }
});

