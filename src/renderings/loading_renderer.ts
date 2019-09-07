import {ipcRenderer, remote} from "electron";

ipcRenderer.on('login', (event: any, success: boolean) => {
    setTimeout(function () {
        if (success) {
            remote.getCurrentWindow().loadFile(remote.getGlobal("paths").views + "logged_in.html")
        } else {
            console.log("Couldnt do request.")
            remote.getCurrentWindow().loadFile(remote.getGlobal("paths").baseDirectory + "login_screen.html")
        }
    }.bind(this), 15000)
})
