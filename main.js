// entry point
require('electron-reload')(__dirname)

const {app, BrowserWindow} = require("electron")
const {ipcMain} = require("electron")
//const {ipcRenderer} = require("electron")
const path = require("path")
let window;

//todo initialize that in a function too? idk
if (!app.requestSingleInstanceLock()) {
    app.quit()
} else {
    app.on("second-instance", () => {
        if (window.isMinimized()) {
            window.restore()
        } else {
            window.focus()
        }
    })
}

//todo create listener interface for each action, its bad to ahndle everything in one function
function handleListener() {
    ipcMain.on('login', (event, username, password) => {
        console.log("Received! " + username, password) //todo use return-value on login event.returnValue
        window.loadFile(global.paths.views + "loading.html")
        window.webContents.once('dom-ready', () => {
            window.webContents.send('login', true)
            console.log("Sent login!")
        })
        // ipcRenderer.send('redirect', true) //TODO true = STATE OF LOGIN RESPONSE
    })
}

function declareGlobals() {
    console.log("Declaring globals..")
    const baseDirectory = __dirname + "/"
    const srcDirectory = baseDirectory + "src/"
    global.paths = {
        baseDirectory: path.join(baseDirectory),
        srcDirectory: path.join(srcDirectory),
        utilities: path.join(srcDirectory, "utilities/"),
        stylesheets: path.join(srcDirectory, "styles/"),
        views: path.join(srcDirectory, "views/"),
        logic: path.join(srcDirectory, "views/logic/"),
        assets: path.join(baseDirectory, "assets/")
    }
    global.animated = JSON.parse(require("fs").readFileSync(global.paths.utilities + "animations.json", 'utf-8'))
}

function prepareApplication() {
    declareGlobals()
    handleListener()
    window = getWindowInstance()
    window.loadFile('main.html')
    window.once('ready-to-show', () => {
        window.show()
        window.focus()
    })
}

function getWindowInstance() {
    return new BrowserWindow({
        width: 720,
        height: 520,
        backgroundColor: '#2c447e',
        resizable: false,
        show: false,
        frame: false
    })
}

app.on('ready', prepareApplication);

app.on('close', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    } else {
        event.preventDefault()
    }
});

app.on('activate', () => {
    if (window === null) {
        prepareApplication()
    }
});