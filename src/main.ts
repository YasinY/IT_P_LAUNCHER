import {app, BrowserWindow} from "electron";
import * as path from "path";


let mainWindow: Electron.BrowserWindow;

function createWindow() {
    mainWindow = getWindowInstance();
    mainWindow.loadFile(path.resolve(__dirname, './assets/html/login_screen.html'));
    mainWindow.webContents.openDevTools();
    mainWindow.once("ready-to-show", () => {
        mainWindow.show()
    })

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

function declareGlobals() {
    const baseDirectory = __dirname + "/"
    console.log("declaring globals: " + baseDirectory)
    global.relativePaths = {
        baseDirectory: path.join(baseDirectory),
        assets: path.join(baseDirectory, "assets/"),
        utilities: path.join(baseDirectory, "assets/", "utilities/"),
        stylesheets: path.join(baseDirectory, "assets/", "css/"),
        views: path.join(baseDirectory, "assets/", "html/"),
        images: path.join(baseDirectory, "assets/", "images"),
        renderings: path.join(baseDirectory, "renderings/"),
        utilities_src: path.join(baseDirectory, "utilities/")
    };
    console.log("Declared globals!")
    global.animated = JSON.parse(require("fs").readFileSync(global.relativePaths.utilities + "animations.json", 'utf-8'))

    console.log("Saved global!")
    console.log(global.animated)
}

function initializeListeners() {

}

function prepareApplication() {
    console.log("Starting application...")
    declareGlobals()
    initializeListeners()
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
        if (mainWindow.isMinimized()) {
            mainWindow.restore()
        } else {
            mainWindow.focus()
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
    if (mainWindow === null) {
        createWindow();
    }
});

