// entry point

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
}

function prepareApplication() {
    declareGlobals()
    window = new BrowserWindow({width: 720, height: 480, resizable: false, frame: false});
    //window.setMenu(null)
    window.loadFile('main.html')
}

app.on('ready', prepareApplication);

app.on('closed', () => {
    app.quit()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (window === null) {
        prepareApplication()
    }
});