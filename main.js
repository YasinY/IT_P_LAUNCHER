// entry point
require('electron-reload')(__dirname)

const {app, BrowserWindow} = require("electron");
const path = require("path")
let window;

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

function declareGlobals() {
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
    window = new BrowserWindow({width: 720, height: 520, backgroundColor: '#2c447e', resizable: false, show: false, frame: false})
    window.loadFile('main.html')
    window.once('ready-to-show', () => {
        window.show()
        window.focus()
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