import {ipcRenderer, remote} from "electron";
import {Paths} from "../Paths";

ipcRenderer.on('login', (event: any, success: boolean) => {
    setTimeout(function () {
        if (success) {
            remote.getCurrentWindow().loadFile(Paths.VIEWS+ "logged_in.html")
        } else {
            console.log("Couldnt do request.")
            remote.getCurrentWindow().loadFile(Paths.VIEWS+ "login_screen.html")
        }
    }.bind(this), 15000)
})
