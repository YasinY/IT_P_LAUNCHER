import BrowserWindow = Electron.BrowserWindow;
import {EmitListenerHandler} from "../EmitListenerHandler";

@EmitListenerHandler.register
class LoginEmitListener extends EmitListenerHandler {

    getEmitTrigger(): string {
        return "login";
    }

    onEmit(currentWindow: BrowserWindow): Function {
        return (event: any, username: string, password: string) => { //TODO figure out why event cant have a type other than any
            currentWindow.loadFile(global.relativePaths.views + "loading.html")
            console.log("received " + username + " and " + password);
            currentWindow.webContents.once('dom-ready', () => {
                event.reply('login', false)
                console.log("Sent login!")
            })
        };
    }
}
