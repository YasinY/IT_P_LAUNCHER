import {app, BrowserWindow} from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
    mainWindow = getWindowInstance();

    mainWindow.loadFile(path.resolve(__dirname, './assets/html/login_screen.html'));


    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

function declareGlobals() {

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
            window.focus()
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", prepareApplication);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
