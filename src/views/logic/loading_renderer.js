
const app = require("electron").remote
const {ipcRenderer} = require('electron')

ipcRenderer.on('login', (event, success) => {
    console.log("SUCCESS? " + success)
    setInterval(function() {app.getCurrentWindow().loadFile(app.getGlobal("paths").views + "logged_in.html") }.bind(this), 2000)
})