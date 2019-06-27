
const app = require("electron").remote
const {ipcRenderer} = require('electron')

ipcRenderer.on('login', (event, success) => {
    setTimeout(function() {
        if(success) {
            app.getCurrentWindow().loadFile(app.getGlobal("paths").views + "logged_in.html")
        } else {
            console.log("Couldnt do request.")
            app.getCurrentWindow().loadFile(app.getGlobal("paths").baseDirectory + "login_screen.html")
        }
    }.bind(this), 15000)
})