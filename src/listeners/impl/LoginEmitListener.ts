import {EmitListener} from "../EmitListener";

export class LoginEmitListener extends EmitListener {

    getDefaultArguments(): Parameters<(username: string, password: string) => void> {
        return ["test", "test"];
    }

    getEmitTrigger(): string {
        return "login";
    }

    onEmit(): Function {
        return (event: any, username: string, password: string) => { //TODO figure out why event cant have a type other than any
            //this.currentWindow.loadFile(global.relativePaths.views + "loading.html")
            console.log("received " + username + " and " + password);
            super.getCurrentWindow().webContents.once('dom-ready', () => {
                //event.reply('login', false)
                console.log("Sent login!")
            })
        };
    }
}
